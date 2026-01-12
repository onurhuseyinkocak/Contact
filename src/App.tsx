import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import SplashScreen from './components/SplashScreen'
import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load: block scroll until splash is done
    document.body.style.overflow = 'hidden';
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="app">
      {isLoading && <SplashScreen onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <ParticleBackground />
          <Navbar />
          <main className="main-content">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certificates />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App;
