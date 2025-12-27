import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Onur Huseyin Kocak
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="tagline"
        >
          React & React Native Developer, Passionate about building performant and beautiful mobile & web apps.
        </motion.p>
        
        <motion.button
          className="contact-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.button>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {[
            { name: 'React', level: 90 },
            { name: 'React Native', level: 80 },
            { name: 'TypeScript', level: 80 },
            { name: 'JavaScript', level: 85 },
          ].map((skill, index) => (
            <div key={index} className="skill-item">
              <span>{skill.name}</span>
              <div className="skill-bar-container">
                <motion.div 
                  className="skill-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
                <span className="skill-percent">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {[
            { title: 'Project 1', description: 'React app with API Integration' },
            { title: 'Project 2', description: 'Mobile app using React Native' },
            { title: 'Project 3', description: 'TypeScript library' },
          ].map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home