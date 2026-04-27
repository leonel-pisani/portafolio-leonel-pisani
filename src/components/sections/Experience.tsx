import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Data ──────────────────────────────── */
const EXPERIENCES = [
  {
    role:    'Vendedor / Atención al Cliente',
    company: 'Manjar Campestre',
    period:  '2019 – Actualidad',
    type:    'Presencial',
    details: [
      'Atención al cliente en mercados itinerantes y eventos.',
      'Gestión de ventas y stock.',
      'Facturación y control administrativo.',
    ],
  },
  {
    role:    'Vendedor en Eventos',
    company: 'Speed (AGS, Comic Con)',
    period:  '2024 – 2025',
    type:    'Por evento',
    details: [
      'Trabajo en entornos dinámicos con flujo masivo de clientes.',
      'Comunicación efectiva y adaptación rápida a distintos contextos.',
      'Cumplimiento de objetivos bajo presión en eventos multitudinarios.',
    ],
  },
]

/* ── Timeline item ─────────────────────── */
const TimelineItem = ({
  exp,
  index,
  isLast,
}: {
  exp:    (typeof EXPERIENCES)[number]
  index:  number
  isLast: boolean
}) => {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{
        display:   'flex',
        gap:       '20px',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition:`opacity 500ms ${index * 150}ms, transform 500ms ${index * 150}ms`,
      }}
    >
      {/* Timeline spine */}
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          flexShrink:    0,
          paddingTop:    '4px',
        }}
      >
        <div
          style={{
            width:        '12px',
            height:       '12px',
            borderRadius: '50%',
            border:       '2px solid var(--accent)',
            background:   'var(--bg0)',
            flexShrink:   0,
            boxShadow:    '0 0 8px rgba(163,230,53,0.4)',
          }}
        />
        {!isLast && (
          <div
            style={{
              width:      '1px',
              flex:       1,
              marginTop:  '6px',
              background: 'linear-gradient(to bottom, var(--accent)44, var(--border-subtle))',
              minHeight:  '40px',
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex:          1,
          background:    'var(--bg1)',
          border:        '0.5px solid var(--border-subtle)',
          borderRadius:  'var(--radius-xl)',
          padding:       '20px 22px',
          marginBottom:  isLast ? 0 : '16px',
          transition:    'border-color 200ms, box-shadow 200ms',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border-accent)'
          el.style.boxShadow   = '0 4px 20px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border-subtle)'
          el.style.boxShadow   = 'none'
        }}
      >
        {/* Header row */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-start',
            flexWrap:       'wrap',
            gap:            '8px',
            marginBottom:   '4px',
          }}
        >
          <h3
            style={{
              fontSize:   '15px',
              fontWeight: 500,
              color:      'var(--text-primary)',
            }}
          >
            {exp.role}
          </h3>

          <span
            style={{
              fontFamily:   'var(--mono)',
              fontSize:     '10px',
              color:        'var(--accent)',
              background:   'var(--accent-dim)',
              border:       '0.5px solid var(--accent-border)',
              padding:      '3px 10px',
              borderRadius: '100px',
              whiteSpace:   'nowrap',
            }}
          >
            {exp.period}
          </span>
        </div>

        {/* Company + type */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize:   '12px',
              color:      'var(--text-muted)',
            }}
          >
            {exp.company}
          </span>
          <span
            style={{
              fontSize:   '10px',
              color:      'var(--text-muted)',
              background: 'var(--bg3)',
              border:     '0.5px solid var(--border-subtle)',
              padding:    '1px 7px',
              borderRadius:'4px',
              fontFamily: 'var(--mono)',
            }}
          >
            {exp.type}
          </span>
        </div>

        {/* Details */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {exp.details.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize:  '13px',
                color:     'var(--text-secondary)',
                display:   'flex',
                gap:       '10px',
                lineHeight:1.55,
              }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── Main section ──────────────────────── */
const Experience = () => {
  return (
    <section
      id="experience"
      style={{
        padding:   'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        borderTop: '0.5px solid var(--border-subtle)',
      }}
    >
      <p className="section-label">experience</p>
      <h2 className="section-title" style={{ marginBottom: '40px' }}>
        Experiencia
      </h2>

      <div style={{ maxWidth: '680px' }}>
        {EXPERIENCES.map((exp, i) => (
          <TimelineItem
            key={i}
            exp={exp}
            index={i}
            isLast={i === EXPERIENCES.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

export default Experience