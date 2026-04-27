import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ────────────────────────────────────────────
  INSTRUCCIONES:
  Reemplazá los campos `image` con las rutas
  reales de tus imágenes de certificado.
  Podés ponerlas en: /public/certificates/
  Ejemplo: image: '/certificates/python.jpg'
  
  Si no tenés imagen, dejá image: '' y se
  mostrará un placeholder con el emoji.
──────────────────────────────────────────── */

interface Course {
  title:       string
  institution: string
  year:        string
  badge:       string   // emoji o texto corto
  color:       string   // color acento de la card
  image:       string   // ruta de imagen del certificado
  link:        string   // URL del certificado
  tags:        string[]
}

const COURSES: Course[] = [
    {
    title:       'Tecniatura universitaria en Programación',
    institution: 'Universidad Nacional de Hurlingham (UNAHUR)',
    year:        'Cursando el proyecto final integrador',
    badge:       '🎓',
    color:       'green',
    image:       `${import.meta.env.BASE_URL}universidad.png`,   // ← reemplazá con '/certificates/python.jpg'
    link:        '',
    tags:        ['Universidad'],
  },
  {
    title:       'Curso de Python',
    institution: 'Universidad Nacional de Hurlingham (UNAHUR)',
    year:        '2025',
    badge:       '🐍',
    color:       '#3b82f6',
    image:       `${import.meta.env.BASE_URL}python.png`,   // ← reemplazá con '/certificates/python.jpg'
    link:        'https://www.linkedin.com/feed/update/urn:li:activity:7389424724558180352/',
    tags:        ['Python', 'Programación', 'Universidad'],
  },
  {
    title:       'Java + Spring Boot',
    institution: 'Talento Tech',
    year:        '2025',
    badge:       '☕',
    color:       '#f59e0b',
    image:       `${import.meta.env.BASE_URL}java.png`,   // ← reemplazá con '/certificates/java.jpg'
    link:        'https://www.linkedin.com/feed/update/urn:li:activity:7407502423205908481/',
    tags:        ['Java', 'Spring Boot', 'Backend'],
  },
  {
    title:       'Introducción a IA',
    institution: 'Universidad Nacional de Hurlingham (UNAHUR)',
    year:        '2025',
    badge:       '🤖',
    color:       '#a855f7',
    image:       `${import.meta.env.BASE_URL}IA.png`,   // ← reemplazá con '/certificates/ia.jpg'
    link:        'https://www.linkedin.com/feed/update/urn:li:activity:7391474468298129408/',
    tags:        ['Inteligencia Artificial', 'Machine Learning'],
  },
]

/* ── Certificate image / placeholder ──── */
const CertImage = ({
  src,
  alt,
  badge,
  color,
}: {
  src:   string
  alt:   string
  badge: string
  color: string
}) => {
  const [imgError, setImgError] = useState(false)
  const [loaded,   setLoaded]   = useState(false)
  const showPlaceholder = !src || imgError

  return (
    <div
      style={{
        position:     'relative',
        width:        '100%',
        aspectRatio:  '16/9',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        overflow:     'hidden',
        background:   showPlaceholder
          ? `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`
          : 'var(--bg2)',
        border:       `0.5px solid ${color}20`,
        flexShrink:   0,
      }}
    >
      {/* Scan line animation (always visible, subtle) */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          inset:      0,
          background: `linear-gradient(to bottom, transparent 0%, ${color}18 50%, transparent 100%)`,
          height:     '40%',
          top:        '-40%',
          animation:  'scan-line 4s ease-in-out infinite',
          zIndex:     2,
          pointerEvents: 'none',
        }}
      />

      {showPlaceholder ? (
        /* Placeholder */
        <div
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '10px',
          }}
        >
          <span style={{ fontSize: '36px', lineHeight: 1 }}>{badge}</span>
          <span
            style={{
              fontFamily:   'var(--mono)',
              fontSize:     '10px',
              color:        color,
              background:   `${color}18`,
              border:       `0.5px solid ${color}30`,
              padding:      '3px 10px',
              borderRadius: '100px',
            }}
          >
            certificado
          </span>
          {/* Decorative grid */}
          <div
            aria-hidden
            style={{
              position:        'absolute',
              inset:           0,
              backgroundImage: `
                linear-gradient(${color}12 1px, transparent 1px),
                linear-gradient(90deg, ${color}12 1px, transparent 1px)
              `,
              backgroundSize:  '24px 24px',
              pointerEvents:   'none',
            }}
          />
        </div>
      ) : (
        /* Real image */
        <>
          {!loaded && (
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%)',
                backgroundSize: '200% 100%',
                animation:  'shimmer 1.6s infinite',
              }}
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              opacity:    loaded ? 1 : 0,
              transition: 'opacity 300ms, transform 400ms',
              transform:  'scale(1)',
            }}
          />
        </>
      )}
    </div>
  )
}

/* ── Course card ───────────────────────── */
const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const { ref, visible } = useScrollReveal()
  const [hovered, setHovered]   = useState(false)

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       'flex',
        flexDirection: 'column',
        background:    'var(--bg1)',
        border:        `0.5px solid ${hovered ? course.color + '44' : 'var(--border-subtle)'}`,
        borderRadius:  'var(--radius-xl)',
        overflow:      'hidden',
        cursor:        'default',
        opacity:       visible ? 1 : 0,
        transform:     visible
          ? hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)'
          : 'translateY(32px)',
        transition: visible
          ? `border-color 200ms, box-shadow 200ms, transform 350ms cubic-bezier(0.34,1.56,0.64,1)`
          : `opacity 500ms ${index * 120}ms, transform 500ms ${index * 120}ms`,
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.55), 0 0 0 0.5px ${course.color}20, inset 0 1px 0 ${course.color}18`
          : 'none',
      }}
    >
      {/* Certificate image */}
      <CertImage
        src={course.image}
        alt={`Certificado: ${course.title}`}
        badge={course.badge}
        color={course.color}
      />

      {/* Card body */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {/* Top row: year badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily:   'var(--mono)',
              fontSize:     '10px',
              color:        course.color,
              background:   course.color + '14',
              border:       `0.5px solid ${course.color}28`,
              padding:      '2px 9px',
              borderRadius: '100px',
            }}
          >
            {course.year}
          </span>
          <span style={{ fontSize: '16px' }}>{course.badge}</span>
        </div>

        {/* Title */}
        <div>
          <h3
            style={{
              fontSize:   '14px',
              fontWeight: 500,
              color:      hovered ? 'var(--text-primary)' : 'var(--text-primary)',
              marginBottom:'3px',
              transition: 'color 200ms',
            }}
          >
            {course.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize:   '11px',
              color:      'var(--text-muted)',
            }}
          >
            {course.institution}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {course.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily:   'var(--mono)',
                fontSize:     '10px',
                color:        'var(--text-muted)',
                background:   'var(--bg3)',
                border:       '0.5px solid var(--border-subtle)',
                padding:      '2px 8px',
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver certificado: ${course.title}`}
          style={{
            marginTop:      'auto',
            fontFamily:     'var(--mono)',
            fontSize:       '11px',
            fontWeight:     500,
            color:          hovered ? course.color : 'var(--text-secondary)',
            textDecoration: 'none',
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '5px',
            borderTop:      '0.5px solid var(--border-subtle)',
            paddingTop:     '12px',
            transition:     'color 200ms',
          }}
        >
          ↗ Ver certificado
        </a>
      </div>

      {/* Bottom color accent line */}
      <div
        style={{
          height:     '2px',
          background: `linear-gradient(90deg, ${course.color}, transparent)`,
          opacity:    hovered ? 0.9 : 0.3,
          transition: 'opacity 250ms',
        }}
      />
    </article>
  )
}

/* ── Main section ──────────────────────── */
const Courses = () => {
  return (
    <section
      id="courses"
      style={{
        padding:   'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        borderTop: '0.5px solid var(--border-subtle)',
      }}
    >
      <p className="section-label">education</p>
      <h2 className="section-title" style={{ marginBottom: '10px' }}>
        Universidad & Cursos & Certificaciones
      </h2>
      <p
        style={{
          fontSize:     '14px',
          color:        'var(--text-secondary)',
          marginBottom: '36px',
          maxWidth:     '480px',
        }}
      >
        Formación universitaria, complementaria y certificaciones obtenidas durante mi carrera.
      </p>

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap:                 '16px',
        }}
      >
        {COURSES.map((course, i) => (
          <CourseCard key={i} course={course} index={i} />
        ))}
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

export default Courses