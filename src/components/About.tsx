import { motion } from 'framer-motion';
import { cvData } from '../data/data';
import './About.css';

const About = () => {
    const { personal, skills } = cvData;

    const skillCategories = [
        { name: 'Development', category: 'development', icon: '💻' },
        { name: 'Vibe Coding Platforms', category: 'platforms', icon: '🚀' },
        { name: 'Product Development', category: 'nocode', icon: '⚡' },
        { name: 'Design & Tools', category: 'design', icon: '🎨' },
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-center">
                        About Me
                    </h2>

                    <div className="about-content">
                        <motion.div
                            className="about-text glass-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3>👋 Nice to meet you!</h3>
                            <p>{personal.bio}</p>
                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-icon">🎯</span>
                                    <span className="highlight-text"><strong>Specialty:</strong> Vibe Coding & AI-Assisted Development</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">⚡</span>
                                    <span className="highlight-text"><strong>Strength:</strong> Rapid MVP Development</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">💡</span>
                                    <span className="highlight-text"><strong>Focus:</strong> User Experience & Performance</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="skills-wrapper">
                            {skillCategories.map((cat, catIndex) => {
                                const categorySkills = skills.filter(s => s.category === cat.category);

                                return (
                                    <motion.div
                                        key={cat.category}
                                        className="skill-category glass-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * catIndex }}
                                    >
                                        <h3 className="category-title">
                                            <span className="category-icon">{cat.icon}</span>
                                            {cat.name}
                                        </h3>
                                        <div className="skills-list">
                                            {categorySkills.map((skill, index) => (
                                                <div key={skill.name} className="skill-bar-wrapper">
                                                    <div className="skill-bar-header">
                                                        <span className="skill-name">{skill.name}</span>
                                                        <span className="skill-level">{skill.level}%</span>
                                                    </div>
                                                    <div className="skill-bar-bg">
                                                        <motion.div
                                                            className="skill-bar-fill"
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.1 * index }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
