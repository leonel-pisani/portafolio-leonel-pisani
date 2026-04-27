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
   Agrega o quitá repos de esta lista para
   controlar cuáles se muestran en el portfolio.
────────────────────────────────────────── */
const REPO_NAMES = [
  'back-UNAHUR-anti-social',
  'front-UNAHUR-anti-social',
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
          REPO_NAMES.map(async repoName => {
            const [repoRes, langRes] = await Promise.all([
              fetch(`https://api.github.com/repos/${username}/${repoName}`),
              fetch(`https://api.github.com/repos/${username}/${repoName}/languages`),
            ])

            if (!repoRes.ok) {
              throw new Error(`Repo "${repoName}" no encontrado (${repoRes.status})`)
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