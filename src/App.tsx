import './styles/globals.css'

import Navbar     from './components/layout/Navbar'
import Footer     from './components/layout/Footer'
import Hero       from './components/sections/Hero'
import TechStack  from './components/sections/TechStack'
import Projects   from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Courses    from './components/sections/Courses'
import Contact    from './components/sections/Contact'

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Experience />
        <Courses />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App