import { motion } from 'framer-motion';
import { cvData } from '../data/data';
import './Experience.css';

const Experience = () => {
    const { experience } = cvData;

    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-center">
                        Experience
                    </h2>
                    <p className="section-subtitle text-center">
                        My professional journey and key achievements
                    </p>

                    <div className="timeline">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                className="timeline-item"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="timeline-marker">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-line"></div>
                                </div>

                                <div className="timeline-content glass-card">
                                    <div className="experience-header">
                                        <div>
                                            <h3 className="experience-role">{exp.role}</h3>
                                            <div className="experience-company">{exp.company}</div>
                                        </div>
                                        <div className="experience-date">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </div>
                                    </div>

                                    <p className="experience-description">{exp.description}</p>

                                    <div className="experience-achievements">
                                        <h4>Key Achievements:</h4>
                                        <ul>
                                            {exp.achievements.map((achievement, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * i }}
                                                >
                                                    <span className="achievement-icon">✓</span>
                                                    {achievement}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
