import { useGithubRepos } from '../../hooks/useGithubRepos'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Language badge colors ─────────────── */
const LANG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  JavaScript: { bg: 'rgba(234,179,8,0.12)',   color: '#ca8a04', border: 'rgba(234,179,8,0.22)'   },
  TypeScript: { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa', border: 'rgba(59,130,246,0.22)'  },
  HTML:       { bg: 'rgba(249,115,22,0.12)',  color: '#fb923c', border: 'rgba(249,115,22,0.22)'  },
  CSS:        { bg: 'rgba(125,211,252,0.12)', color: '#7dd3fc', border: 'rgba(125,211,252,0.22)' },
  Shell:      { bg: 'rgba(163,230,53,0.10)',  color: '#84cc16', border: 'rgba(163,230,53,0.18)'  },
}
const DEFAULT_LANG = { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', border: 'rgba(255,255,255,0.1)' }

/* ── Skeleton ──────────────────────────── */
const Skeleton = ({ width = '100%', height = '16px', radius = '6px' }: {
  width?: string; height?: string; radius?: string
}) => (
  <div
    style={{
      width, height,
      borderRadius: radius,
      background:   'linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%)',
      backgroundSize: '200% 100%',
      animation:    'shimmer 1.6s infinite',
    }}
  />
)

/* ── Project card ──────────────────────── */
const ProjectCard = ({
  repo,
  index,
}: {
  repo:  { id: number; name: string; description: string; html_url: string; languages: string[] }
  index: number
}) => {
  const { ref, visible } = useScrollReveal()

  return (
    <article
      ref={ref}
      style={{
        position:   'relative',
        background: 'var(--bg1)',
        border:     '0.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding:    '24px',
        overflow:   'hidden',
        cursor:     'default',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 500ms ${index * 120}ms, transform 500ms ${index * 120}ms, border-color 200ms, box-shadow 200ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(163,230,53,0.3)'
        el.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(163,230,53,0.1)'
        const bar = el.querySelector('.project-top-bar') as HTMLElement
        if (bar) bar.style.opacity = '1'
        const link = el.querySelector('.project-link') as HTMLElement
        if (link) link.style.color = 'var(--accent)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-subtle)'
        el.style.boxShadow   = 'none'
        const bar = el.querySelector('.project-top-bar') as HTMLElement
        if (bar) bar.style.opacity = '0'
        const link = el.querySelector('.project-link') as HTMLElement
        if (link) link.style.color = 'var(--text-secondary)'
      }}
    >
      {/* Top accent bar */}
      <div
        className="project-top-bar"
        style={{
          position:   'absolute',
          top: 0, left: 0, right: 0,
          height:     '2px',
          background: 'linear-gradient(90deg, var(--accent), var(--blue), transparent)',
          opacity:    0,
          transition: 'opacity 250ms',
        }}
      />

      {/* Repo name */}
      <h3
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '14px',
          fontWeight:    600,
          color:         'var(--text-primary)',
          marginBottom:  '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {repo.name}
      </h3>

      <p
        style={{
          fontSize:     '13px',
          color:        'var(--text-secondary)',
          marginBottom: '18px',
          lineHeight:   1.65,
          flexGrow:     1,
        }}
      >
        {repo.description || 'Sin descripción disponible.'}
      </p>

      {/* Language badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {repo.languages.map(lang => {
          const style = LANG_STYLES[lang] ?? DEFAULT_LANG
          return (
            <span
              key={lang}
              style={{
                fontFamily:   'var(--mono)',
                fontSize:     '10px',
                fontWeight:   500,
                color:        style.color,
                background:   style.bg,
                border:       `0.5px solid ${style.border}`,
                padding:      '3px 10px',
                borderRadius: '100px',
                letterSpacing:'0.04em',
              }}
            >
              {lang}
            </span>
          )
        })}
      </div>

      {/* Link */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
        aria-label={`Ver ${repo.name} en GitHub`}
        style={{
          fontFamily:     'var(--mono)',
          fontSize:       '12px',
          color:          'var(--text-secondary)',
          textDecoration: 'none',
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '6px',
          transition:     'color 200ms',
        }}
      >
        ↗ Ver en GitHub
      </a>
    </article>
  )
}

/* ── Main section ──────────────────────── */
const Projects = () => {
  const { repos } = useGithubRepos('leonel-pisani')

  return (
    <section
      id="projects"
      style={{
        padding:    'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        borderTop:  '0.5px solid var(--border-subtle)',
      }}
    >
      <p className="section-label">projects</p>
      <h2 className="section-title" style={{ marginBottom: '10px' }}>
        Proyectos
      </h2>
      <p
        style={{
          fontSize:     '14px',
          color:        'var(--text-secondary)',
          marginBottom: '36px',
          maxWidth:     '440px',
        }}
      >
        Repositorios públicos en GitHub. Código real, problemas reales.
      </p>

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap:                 '14px',
        }}
      >
        {repos.length === 0
          ? /* Loading skeletons */
            [0, 1].map(i => (
              <div
                key={i}
                style={{
                  background:   'var(--bg1)',
                  border:       '0.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding:      '24px',
                  display:      'flex',
                  flexDirection:'column',
                  gap:          '12px',
                }}
              >
                <Skeleton width="60%" height="14px" />
                <Skeleton width="90%" height="12px" />
                <Skeleton width="75%" height="12px" />
                <div style={{ display:'flex', gap:'8px' }}>
                  <Skeleton width="64px" height="20px" radius="100px" />
                  <Skeleton width="52px" height="20px" radius="100px" />
                </div>
              </div>
            ))
          : repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))
        }
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  )
}

export default Projects