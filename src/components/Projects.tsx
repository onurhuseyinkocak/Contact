import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cvData } from '../data/data';
import './Projects.css';

const Projects = () => {
    const [filter, setFilter] = useState<string>('all');
    const { projects } = cvData;

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'mobile', label: 'Mobile Apps' },
        { id: 'web', label: 'Web Apps' },
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const categoryIcons: Record<string, string> = {
        mobile: '📱',
        web: '🌐',
        nocode: '🚀',
        other: '💡'
    };

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-center">
                        My Projects
                    </h2>
                    <p className="section-subtitle text-center">
                        Here are some of my recent projects showcasing my development and no-code skills
                    </p>

                    {/* Filter Buttons */}
                    <div className="project-filters">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                                onClick={() => setFilter(cat.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <motion.div className="projects-grid" layout>
                        <AnimatePresence mode="wait">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="project-card glass-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    {project.featured && (
                                        <div className="featured-badge">⭐ Featured</div>
                                    )}

                                    <div className="project-icon">
                                        {categoryIcons[project.category]}
                                    </div>

                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-technologies">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                <span>🔗</span> Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                <span>📂</span> GitHub
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
