import { useEffect, useState } from 'react'

/* Typing effect for the subtitle roles */
const ROLES = [
  'Backend Developer',
  'APIs REST Developer',
  'Frontend Developer',
  'Full-Stack Learner',
]

const Hero = () => {
  const [roleIdx,  setRoleIdx]  = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [mounted,   setMounted]   = useState(false)

  /* Fade-in on mount */
  useEffect(() => { setMounted(true) }, [])

  /* Typewriter */
  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  return (
    <section
      id="hero"
      style={{
        minHeight:  'calc(100vh - 64px)',
        marginTop:  '64px',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:    'clamp(40px, 8vw, 90px) clamp(24px, 6vw, 80px)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Animated grid background */}
      <div
        aria-hidden
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: `
            linear-gradient(rgba(163,230,53,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,230,53,0.032) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          animation:      'grid-move 12s linear infinite',
          pointerEvents:  'none',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          top:        '-160px',
          left:       '-100px',
          width:      '700px',
          height:     '600px',
          background: 'radial-gradient(ellipse at center, rgba(163,230,53,0.065) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* Secondary glow right */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          bottom:     '-80px',
          right:      '-80px',
          width:      '500px',
          height:     '400px',
          background: 'radial-gradient(ellipse at center, rgba(125,211,252,0.04) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position:  'relative',
          zIndex:    1,
          maxWidth:  '680px',
          opacity:   mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 700ms ease, transform 700ms ease',
        }}
      >
        {/* Available badge */}
        <div
          style={{
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '8px',
            fontFamily:  'var(--mono)',
            fontSize:    '11px',
            color:       'var(--accent)',
            background:  'rgba(163,230,53,0.08)',
            border:      '0.5px solid rgba(163,230,53,0.28)',
            padding:     '5px 14px',
            borderRadius:'100px',
            marginBottom:'24px',
          }}
        >
          <span
            style={{
              width:        '7px',
              height:       '7px',
              borderRadius: '50%',
              background:   'var(--accent)',
              flexShrink:   0,
              animation:    'pulse-dot 2s ease-in-out infinite',
            }}
          />
          disponible para trabajar
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize:      'clamp(44px, 8vw, 76px)',
            fontWeight:    600,
            lineHeight:    1.04,
            letterSpacing: '-0.04em',
            marginBottom:  '12px',
            fontFamily:    'var(--sans)',
          }}
        >
          Leonel{' '}
          <span style={{ color: 'var(--accent)' }}>Pisani</span>
        </h1>

        {/* Typewriter role */}
        <div
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      'clamp(15px, 2.5vw, 19px)',
            color:         'var(--text-secondary)',
            marginBottom:  '20px',
            minHeight:     '28px',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>&gt; </span>
          <span style={{ color: 'var(--blue)' }}>{displayed}</span>
          <span
            style={{
              display:         'inline-block',
              width:           '2px',
              height:          '1.1em',
              background:      'var(--accent)',
              marginLeft:      '3px',
              verticalAlign:   'middle',
              animation:       'pulse-dot 1s step-start infinite',
            }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            fontSize:      'clamp(14px, 2vw, 16px)',
            color:         'var(--text-secondary)',
            maxWidth:      '500px',
            marginBottom:  '36px',
            lineHeight:    1.75,
          }}
        >
          Desarrollador Full Stack Junior con formación en{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            Tecnicatura Universitaria en Programación (UNAHUR)
          </strong>, promedio 8.05.
          <br />
          Experiencia en desarrollo de aplicaciones web con{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            React, Node.js, Express y Spring Boot
          </strong>.
          <br />
          Manejo de bases de datos{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            MySQL y MongoDB
          </strong>, APIs REST y buenas prácticas.
          <br />
          Busco mi primera experiencia profesional como desarrollador Junior o Trainee.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              fontFamily:     'var(--mono)',
              fontSize:       '13px',
              fontWeight:     600,
              color:          'var(--text-on-accent)',
              background:     'var(--accent)',
              textDecoration: 'none',
              padding:        '12px 26px',
              borderRadius:   'var(--radius)',
              transition:     'opacity 150ms, transform 150ms',
              display:        'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = '0.85'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            ver proyectos →
          </a>

          <a
            href="#contact"
            style={{
              fontFamily:     'var(--mono)',
              fontSize:       '13px',
              color:          'var(--text-secondary)',
              background:     'transparent',
              textDecoration: 'none',
              padding:        '12px 26px',
              borderRadius:   'var(--radius)',
              border:         '0.5px solid var(--border-default)',
              transition:     'color 200ms, border-color 200ms, transform 150ms',
              display:        'inline-block',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--text-primary)'
              el.style.borderColor = 'var(--border-accent)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--text-secondary)'
              el.style.borderColor = 'var(--border-default)'
              el.style.transform = 'translateY(0)'
            }}
          >
            contacto
          </a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            marginTop:   '60px',
            display:     'flex',
            alignItems:  'center',
            gap:         '10px',
            color:       'var(--text-muted)',
            fontFamily:  'var(--mono)',
            fontSize:    '11px',
            animation:   'fade-in 1s 1.2s both',
          }}
        >
          <div
            style={{
              width:    '1px',
              height:   '32px',
              background: 'linear-gradient(to bottom, transparent, var(--text-muted))',
            }}
          />
          scroll para explorar
        </div>
      </div>
    </section>
  )
}

export default Hero