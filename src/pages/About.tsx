const About = () => {
  return (
    <div className="about-page">
      <h2>About Me</h2>
      <p>
        I'm Onur Hüseyin Koçak, a passionate frontend and mobile developer with expertise in React, 
        React Native, and TypeScript. I specialize in creating performant and visually appealing 
        applications that provide excellent user experiences.
      </p>
      
      <div className="details-grid">
        <div className="detail-card">
          <h3>Experience</h3>
          <p>5+ years in web and mobile development</p>
        </div>
        <div className="detail-card">
          <h3>Education</h3>
          <p>Computer Engineering, Istanbul Technical University</p>
        </div>
        <div className="detail-card">
          <h3>Location</h3>
          <p>Istanbul, Turkey</p>
        </div>
        <div className="detail-card">
          <h3>Contact</h3>
          <p>onur@example.com</p>
          <p>+90 555 123 4567</p>
        </div>
      </div>
    </div>
  )
}

export default About