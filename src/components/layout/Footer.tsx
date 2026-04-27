const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop:      '0.5px solid var(--border-subtle)',
        padding:        '20px 40px',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        flexWrap:       'wrap',
        gap:            '12px',
        background:     'var(--bg0)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize:   '11px',
          color:      'var(--text-muted)',
        }}
      >
        © {year} Leonel Pisani
      </span>

      <span
        style={{
          fontFamily:  'var(--mono)',
          fontSize:    '11px',
          color:       'var(--accent)',
          display:     'flex',
          alignItems:  'center',
          gap:         '6px',
        }}
      >
        <span
          style={{
            width:        '6px',
            height:       '6px',
            borderRadius: '50%',
            background:   'var(--accent)',
            display:      'inline-block',
            animation:    'pulse-dot 2s ease-in-out infinite',
          }}
        />
        disponible para trabajar
      </span>
    </footer>
  )
}

export default Footer