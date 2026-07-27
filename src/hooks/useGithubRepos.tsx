import { useEffect, useState } from 'react'

/* ── Types ─────────────────────────────── */
export interface Repo {
  id:          number
  name:        string
  description: string
  html_url:    string
  languages:   string[]
}

interface HookState {
  repos:   Repo[]
  loading: boolean
  error:   string | null
}

/* ──────────────────────────────────────────
   Agrega o quitá repos de esta lista.
   - Si es tuyo: solo poné el nombre (ej: 'mi-repo')
   - Si es de una org/otro: poné 'dueño/repo'
────────────────────────────────────────── */
const REPOS_TO_FETCH = [
  'DesApp-2026c1-Grupo-2/Backend',  // Proyecto grupal Backend
  'DesApp-2026c1-Grupo-2/Frontend', // Proyecto grupal Frontend
  'back-UNAHUR-anti-social',
  'front-UNAHUR-anti-social',
  'ciu-tp1-grupo2',
]

/* ── Hook ──────────────────────────────── */
export const useGithubRepos = (username: string): HookState => {
  const [state, setState] = useState<HookState>({
    repos:   [],
    loading: true,
    error:   null,
  })

  useEffect(() => {
    let cancelled = false

    const fetchRepos = async () => {
      try {
        const results = await Promise.all(
          REPOS_TO_FETCH.map(async repoPath => {
            
            // Lógica clave: determinar quién es el dueño de este repo en particular
            const [owner, name] = repoPath.includes('/')
              ? repoPath.split('/')
              : [username, repoPath]

            const [repoRes, langRes] = await Promise.all([
              fetch(`https://api.github.com/repos/${owner}/${name}`),
              fetch(`https://api.github.com/repos/${owner}/${name}/languages`),
            ])

            if (!repoRes.ok) {
              throw new Error(`Repo "${name}" no encontrado (${repoRes.status})`)
            }

            const [repoData, langData] = await Promise.all([
              repoRes.json(),
              langRes.json(),
            ])

            return {
              id:          repoData.id as number,
              name:        repoData.name as string,
              description: (repoData.description as string) ?? '',
              html_url:    repoData.html_url as string,
              languages:   Object.keys(langData as Record<string, number>),
            } satisfies Repo
          })
        )

        if (!cancelled) {
          setState({ repos: results, loading: false, error: null })
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            repos:   [],
            loading: false,
            error:   err instanceof Error ? err.message : 'Error desconocido',
          })
        }
      }
    }

    fetchRepos()

    return () => { cancelled = true }
  }, [username])

  return state
}