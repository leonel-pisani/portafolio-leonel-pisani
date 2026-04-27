import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Types ─────────────────────────────── */
interface Tech {
  name:      string
  level:     'expert' | 'proficient' | 'learning'
  highlight?: boolean
  emoji:     string
}

interface TechGroup {
  category: string
  color:    string
  techs:    Tech[]
}

/* ── Data ──────────────────────────────── */
const TECH_STACK: TechGroup[] = [
  {
    category: 'Frontend',
    color:    '#7dd3fc',
    techs: [
      { name: 'React',      level: 'proficient', highlight: true, emoji: '⚛️' },
      { name: 'TypeScript', level: 'proficient',                  emoji: '🔷' },
      { name: 'JavaScript', level: 'expert',                      emoji: '🟨' },
      { name: 'HTML',       level: 'expert',                      emoji: '🌐' },
      { name: 'CSS',        level: 'expert',                      emoji: '🎨' },
    ],
  },
  {
    category: 'Backend',
    color:    '#a3e635',
    techs: [
      { name: 'Node.js',            level: 'proficient', highlight: true, emoji: '🟢' },
      { name: 'Express',            level: 'proficient',                  emoji: '⚡' },
      { name: 'JavaScript',         level: 'expert',                      emoji: '🟨' },
      { name: 'Java (Spring Boot)', level: 'learning',                    emoji: '☕' },
      { name: 'Python',             level: 'proficient',                  emoji: '🐍' },
    ],
  },
  {
    category: 'Base de Datos',
    color:    '#fb923c',
    techs: [
      { name: 'MongoDB', level: 'proficient', highlight: true, emoji: '🍃' },
      { name: 'MySQL',   level: 'proficient',                  emoji: '🐬' },
    ],
  },
  {
    category: 'Herramientas',
    color:    '#c084fc',
    techs: [
      { name: 'Git',                level: 'proficient', highlight: true, emoji: '🔀' },
      { name: 'GitHub',             level: 'proficient',                  emoji: '🐙' },
      { name: 'Visual Studio Code', level: 'proficient',                  emoji: '📝' },
      { name: 'Docker',             level: 'learning',                    emoji: '🐳' },
    ],
  },
  {
    category: 'Conceptos',
    color:    '#f87171',
    techs: [
      { name: 'APIs REST',        level: 'proficient', highlight: true, emoji: '🔌' },
      { name: 'POO',              level: 'proficient',                  emoji: '🏗️' },
      { name: 'Scrum',            level: 'proficient',                  emoji: '🏃' },
    ],
  },
]

const LEVEL_LABEL: Record<string, string> = {
  expert:     'experto',
  proficient: 'fluido',
  learning:   'aprendiendo',
}

/* ── TechCard ──────────────────────────── */
const TechCard = ({
  tech,
  accentColor,
  delay,
}: {
  tech:        Tech
  accentColor: string
  delay:       number
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   'relative',
        background: hovered
          ? 'var(--bg3)'
          : tech.highlight
          ? 'var(--bg2)'
          : 'var(--bg1)',
        border: `0.5px solid ${
          hovered
            ? accentColor + '55'
            : tech.highlight
            ? accentColor + '25'
            : 'var(--border-subtle)'
        }`,
        borderRadius: 'var(--radius-lg)',
        padding:      '14px 16px',
        cursor:       'default',
        transition:   'background 200ms, border-color 200ms, transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms',
        transform:    hovered
          ? 'translateY(-5px) scale(1.025)'
          : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 8px 32px ${accentColor}20, 0 2px 8px rgba(0,0,0,0.4)`
          : tech.highlight
          ? `0 0 0 0.5px ${accentColor}18`
          : 'none',
        animationDelay: `${delay}ms`,
        animation: 'fade-up 500ms both',
        overflow: 'hidden',
      }}
    >
      {/* Animated top border glow on hover */}
      <div
        style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '2px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity:    hovered ? 1 : 0,
          transition: 'opacity 250ms',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      />

      {/* Highlight indicator */}
      {tech.highlight && (
        <div
          style={{
            position:    'absolute',
            top:         '10px',
            right:       '10px',
            width:       '6px',
            height:      '6px',
            borderRadius:'50%',
            background:  accentColor,
            animation:   hovered ? 'pulse-dot 1.4s infinite' : 'glow-pulse 2.5s ease-in-out infinite',
            boxShadow:   `0 0 6px ${accentColor}`,
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '18px', lineHeight: 1 }}>{tech.emoji}</span>
        <span
          style={{
            fontFamily:  'var(--mono)',
            fontSize:    '13px',
            fontWeight:  tech.highlight ? 600 : 400,
            color:       hovered
              ? accentColor
              : tech.highlight
              ? 'var(--text-primary)'
              : 'var(--text-secondary)',
            transition:  'color 200ms',
          }}
        >
          {tech.name}
        </span>
      </div>

      <span
        style={{
          fontFamily:   'var(--mono)',
          fontSize:     '10px',
          color:        accentColor + 'aa',
          background:   accentColor + '12',
          border:       `0.5px solid ${accentColor}28`,
          padding:      '2px 8px',
          borderRadius: '100px',
          letterSpacing:'0.05em',
        }}
      >
        {LEVEL_LABEL[tech.level]}
      </span>
    </div>
  )
}

/* ── TechGroup card ────────────────────── */
const GroupCard = ({
  group,
  groupIndex,
}: {
  group:      TechGroup
  groupIndex: number
}) => {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{
        background:    'var(--bg1)',
        border:        '0.5px solid var(--border-subtle)',
        borderRadius:  'var(--radius-xl)',
        padding:       '22px',
        opacity:       visible ? 1 : 0,
        transform:     visible ? 'translateY(0)' : 'translateY(24px)',
        transition:    `opacity 500ms ${groupIndex * 100}ms, transform 500ms ${groupIndex * 100}ms`,
      }}
    >
      {/* Category header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width:        '3px',
            height:       '18px',
            background:   group.color,
            borderRadius: '2px',
            boxShadow:    `0 0 8px ${group.color}88`,
          }}
        />
        <span
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         group.color,
          }}
        >
          {group.category}
        </span>
      </div>

      <div
        role="list"
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap:                 '10px',
        }}
      >
        {group.techs.map((tech, i) => (
          <TechCard
            key={tech.name}
            tech={tech}
            accentColor={group.color}
            delay={groupIndex * 80 + i * 60}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Main section ──────────────────────── */
const TechStack = () => {
  return (
    <section id="stack" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
      <p className="section-label">tech stack</p>
      <h2 className="section-title" style={{ marginBottom: '10px' }}>
        Tecnologías
      </h2>
      <p
        style={{
          fontSize:     '14px',
          color:        'var(--text-secondary)',
          marginBottom: '36px',
          maxWidth:     '440px',
        }}
      >
        Herramientas y lenguajes con los que trabajo día a día.
        Los puntos verdes indican tecnologías principales.
      </p>

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 '16px',
        }}
      >
        {TECH_STACK.map((group, i) => (
          <GroupCard key={group.category} group={group} groupIndex={i} />
        ))}
      </div>
    </section>
  )
}

export default TechStack