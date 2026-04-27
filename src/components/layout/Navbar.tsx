import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'about',      href: '#hero'      },
  { label: 'stack',      href: '#stack'       },
  { label: 'projects',   href: '#projects'    },
  { label: 'experience', href: '#experience'  },
  { label: 'courses',    href: '#courses'     },
  { label: 'contact',    href: '#contact'     },
]

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '0 28px',
          height:         '64px',
          background:     scrolled
            ? 'rgba(8,8,14,0.92)'
            : 'rgba(8,8,14,0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom:   scrolled
            ? '0.5px solid rgba(255,255,255,0.07)'
            : '0.5px solid transparent',
          transition:     'background 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily:     'var(--mono)',
            fontSize:       '14px',
            fontWeight:     600,
            color:          'var(--accent)',
            textDecoration: 'none',
            letterSpacing:  '-0.01em',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>~/</span>
          leonel-pisani
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display:    'flex',
            gap:        '4px',
            listStyle:  'none',
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNav(href)}
                style={{
                  fontFamily:     'var(--mono)',
                  fontSize:       '12px',
                  color:          active === href
                    ? 'var(--accent)'
                    : 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding:        '6px 12px',
                  borderRadius:   'var(--radius)',
                  background:     active === href
                    ? 'var(--accent-dim)'
                    : 'transparent',
                  transition:     'color 200ms, background 200ms',
                  display:        'block',
                }}
                onMouseEnter={e => {
                  if (active !== href) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== href) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href="https://www.linkedin.com/in/leonel-pisani-316a8136b/?skipRedirect=true"
          style={{
            fontFamily:     'var(--mono)',
            fontSize:       '12px',
            fontWeight:     600,
            color:          'var(--text-on-accent)',
            background:     'var(--accent)',
            border:         'none',
            padding:        '8px 18px',
            borderRadius:   'var(--radius)',
            cursor:         'pointer',
            textDecoration: 'none',
            transition:     'opacity 150ms, transform 150ms',
            display:        'inline-block',
          }}
          className="nav-cta"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.opacity = '0.85'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.opacity = '1'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          LinkedIn
        </a>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="nav-hamburger"
          style={{
            display:    'none',
            flexDirection: 'column',
            gap:        '5px',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display:      'block',
                width:        '22px',
                height:       '1.5px',
                background:   'var(--text-primary)',
                borderRadius: '2px',
                transition:   '250ms ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     99,
          background: 'rgba(8,8,14,0.97)',
          display:    'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap:        '8px',
          opacity:    menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 250ms ease',
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => handleNav(href)}
            style={{
              fontFamily:     'var(--mono)',
              fontSize:       '22px',
              fontWeight:     600,
              color:          active === href ? 'var(--accent)' : 'var(--text-secondary)',
              textDecoration: 'none',
              padding:        '12px 32px',
              borderRadius:   'var(--radius-lg)',
              transition:     'color 200ms, background 200ms',
              background:     active === href ? 'var(--accent-dim)' : 'transparent',
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar