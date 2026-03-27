import './index.css'
import Navbar from './components/Navbar'
import { ScrollProgress, CustomCursor } from './components/PageChrome'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Courses from './sections/Courses'
import Services from './sections/Services'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Courses />
        <Services />
        <Contact />
      </main>
    </>
  )
}

export default App
