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
      // Promise.allSettled en vez de Promise.all: si un repo falla
      // (rate limit, nombre mal escrito, repo movido, etc.) no tira
      // abajo a los demás, simplemente se omite ese.
      const settled = await Promise.allSettled(
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
            throw new Error(`Repo "${repoPath}" no encontrado (${repoRes.status})`)
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

      if (cancelled) return

      const repos = settled
        .filter((r): r is PromiseFulfilledResult<Repo> => r.status === 'fulfilled')
        .map(r => r.value)

      const failed = settled.filter(
        (r): r is PromiseRejectedResult => r.status === 'rejected'
      )

      // Log de los que fallaron para poder diagnosticarlos sin romper la sección entera
      failed.forEach(f => console.warn('[useGithubRepos]', f.reason))

      setState({
        repos,
        loading: false,
        // Si TODOS fallaron, mostramos error. Si solo algunos, mostramos
        // los que sí se pudieron cargar y logueamos el resto en consola.
        error: repos.length === 0 && failed.length > 0
          ? (failed[0].reason instanceof Error ? failed[0].reason.message : 'Error desconocido')
          : null,
      })
    }

    fetchRepos()

    return () => { cancelled = true }
  }, [username])

  return state
}