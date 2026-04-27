# 🚀 Portafolio — Leonel Pisani

Portfolio profesional construido con **Vite + React + TypeScript**.
Diseño Terminal-Craft: oscuro profundo, acento verde lima, tipografía monoespaciada.

## 📦 Instalación

```bash
# Clonar / descargar el proyecto
cd portfolio

# Instalar dependencias base (no hay dependencias externas adicionales)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

> **No se requieren librerías adicionales** — todo el sistema de animaciones
> está implementado con CSS puro y el hook `useScrollReveal` (Intersection Observer nativo).

---

## 🗂️ Estructura del proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Navegación fija con mobile menu
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx           # Sección principal con typewriter
│       ├── TechStack.tsx      # Cards animadas de tecnologías
│       ├── Projects.tsx       # Repos de GitHub (API)
│       ├── Experience.tsx     # Timeline de experiencia
│       ├── Courses.tsx        # Certificaciones con imágenes
│       └── Contact.tsx        # Links de contacto
├── hooks/
│   ├── useGithubRepos.tsx     # Fetch de repos con loading/error
│   └── useScrollReveal.tsx    # Intersection Observer para animaciones
├── styles/
│   └── globals.css            # Design tokens + base styles
├── App.tsx
└── main.tsx
```

---

## ✏️ Personalización

### 1. Tu información personal

En `src/components/layout/Navbar.tsx`:
```tsx
// Cambiá el nombre y el mailto
href="mailto:tuemail@gmail.com"
```

En `src/components/sections/Hero.tsx`:
```tsx
// Cambiá los roles del typewriter
const ROLES = ['Backend Developer', 'Node.js Engineer', ...]
```

En `src/components/sections/Contact.tsx`:
```tsx
// Actualizá email y LinkedIn
{ label: 'Email', value: 'tuemail@gmail.com', href: 'mailto:tuemail@gmail.com' },
{ label: 'LinkedIn', value: 'tu-perfil', href: 'https://linkedin.com/in/tu-perfil' },
```

### 2. Agregar certificados con imágenes

1. Copiá tus imágenes a `/public/certificates/`
2. En `src/components/sections/Courses.tsx`, actualizá el campo `image`:

```tsx
const COURSES = [
  {
    title: 'Curso de Python',
    image: '/certificates/python.jpg',   // ← acá
    link:  'https://link-al-certificado',
    // ...
  },
]
```

Los formatos soportados son: `.jpg`, `.png`, `.webp`.
Si `image` está vacío, se muestra un placeholder animado automáticamente.

### 3. Agregar más repositorios de GitHub

En `src/hooks/useGithubRepos.tsx`:
```tsx
const REPO_NAMES = [
  'back-UNAHUR-anti-social',
  'front-UNAHUR-anti-social',
  'otro-repo',              // ← agregá acá
]
```

### 4. Agregar más tecnologías al stack

En `src/components/sections/TechStack.tsx`, editá `TECH_STACK`:
```tsx
{
  category: 'Cloud',
  color:    '#34d399',
  techs: [
    { name: 'AWS', level: 'learning', emoji: '☁️' },
  ],
},
```

Niveles disponibles: `'expert'` | `'proficient'` | `'learning'`

### 5. Open Graph image

Creá una imagen `public/og-image.png` (1200×630px) y descomentá la línea en `index.html`.

---

## 🎨 Design tokens

Todos los colores y variables están en `src/styles/globals.css`.
Los principales que podés cambiar:

```css
:root {
  --accent:  #a3e635;  /* verde lima — color principal */
  --blue:    #7dd3fc;  /* azul cielo — color secundario */
  --bg0:     #08080e;  /* fondo más oscuro */
}
```

---

## 📱 Responsive

El portafolio es fully responsive:
- **Desktop** (> 768px): layout completo
- **Mobile** (≤ 768px): menú hamburger, grids de 1 columna, tipografía fluida

---

## ♿ Accesibilidad

- `aria-label` en todos los links de proyectos y certificados
- `aria-expanded` en el menú mobile
- Soporte completo para `prefers-reduced-motion`
- `:focus-visible` con ring de foco verde
- Semántica HTML correcta: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`