import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const LINKS = [
  {
    label:   'Email',
    value:   'leonel49pisani@gmail.com',   // ← reemplazá con tu email real
    href:    'mailto:leonel49pisani@gmail.com',
    icon:    '✉',
    color:   '#a3e635',
    primary: true,
  },
  {
    label: 'GitHub',
    value: 'leonel-pisani',
    href:  'https://github.com/leonel-pisani',
    icon:  '⌥',
    color: '#7dd3fc',
  },
  {
    label: 'LinkedIn',
    value: 'Leonel Pisani',     // ← reemplazá cuando lo tengas
    href:  'https://www.linkedin.com/in/leonel-pisani-316a8136b/?skipRedirect=true',
    icon:  '◈',
    color: '#c084fc',
  },
]

/* ── Link card ─────────────────────────── */
const LinkCard = ({ link, index }: { link: typeof LINKS[number]; index: number }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={`${link.label}: ${link.value}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '14px',
        background:     hovered ? 'var(--bg3)' : 'var(--bg2)',
        border:         `0.5px solid ${hovered ? link.color + '44' : 'var(--border-subtle)'}`,
        borderRadius:   'var(--radius-lg)',
        padding:        '16px 20px',
        textDecoration: 'none',
        cursor:         'pointer',
        transition:     'background 200ms, border-color 200ms, transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms',
        transform:      hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow:      hovered ? `0 8px 24px rgba(0,0,0,0.4), 0 0 0 0.5px ${link.color}18` : 'none',
        animation:      `fade-up 400ms ${index * 80}ms both`,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width:          '38px',
          height:         '38px',
          borderRadius:   '50%',
          background:     link.color + '14',
          border:         `0.5px solid ${link.color}28`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '16px',
          color:          link.color,
          flexShrink:     0,
          transition:     'background 200ms, box-shadow 200ms',
          boxShadow:      hovered ? `0 0 12px ${link.color}44` : 'none',
        }}
      >
        {link.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily:   'var(--mono)',
            fontSize:     '10px',
            color:        'var(--text-muted)',
            letterSpacing:'0.08em',
            textTransform:'uppercase',
            marginBottom: '2px',
          }}
        >
          {link.label}
        </p>
        <p
          style={{
            fontSize:   '13px',
            color:      hovered ? link.color : 'var(--text-secondary)',
            fontWeight: link.primary ? 500 : 400,
            transition: 'color 200ms',
            overflow:   'hidden',
            textOverflow:'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {link.value}
        </p>
      </div>

      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize:   '14px',
          color:      hovered ? link.color : 'var(--text-muted)',
          transition: 'color 200ms, transform 200ms',
          transform:  hovered ? 'translate(2px,-2px)' : 'none',
        }}
      >
        ↗
      </span>
    </a>
  )
}

/* ── Main section ──────────────────────── */
const Contact = () => {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="contact"
      style={{
        padding:   'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        borderTop: '0.5px solid var(--border-subtle)',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth:     '680px',
          margin:       '0 auto',
          background:   'var(--bg1)',
          border:       '0.5px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          padding:      'clamp(28px, 5vw, 52px)',
          position:     'relative',
          overflow:     'hidden',
          opacity:      visible ? 1 : 0,
          transform:    visible ? 'translateY(0)' : 'translateY(30px)',
          transition:   'opacity 600ms, transform 600ms',
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position:   'absolute',
            bottom:     '-120px',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '500px',
            height:     '280px',
            background: 'radial-gradient(ellipse at center, rgba(163,230,53,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ marginBottom: '16px' }}>contact</p>

          <h2
            style={{
              fontSize:      'clamp(26px, 4vw, 36px)',
              fontWeight:    600,
              letterSpacing: '-0.03em',
              marginBottom:  '12px',
              lineHeight:    1.15,
            }}
          >
            ¿Trabajamos juntos?
          </h2>

          <p
            style={{
              fontSize:     '14px',
              color:        'var(--text-secondary)',
              marginBottom: '32px',
              maxWidth:     '400px',
              lineHeight:   1.7,
            }}
          >
            Estoy abierto a oportunidades como desarrollador backend,
            frontend, fullstack y proyectos freelance. ¡Hablemos!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LINKS.map((link, i) => (
              <LinkCard key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact