import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Work />
      <Achievements />
      <Contact />
    </main>
  )
}
