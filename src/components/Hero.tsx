import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/data';
import './Hero.css';

const sections = ['hero', 'about', 'projects', 'experience', 'certificates', 'contact'];

const Hero = () => {
    const { personal } = cvData;
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            // Detect current section
            sections.forEach((sectionId, index) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                        setCurrentSection(index);
                        // If we're at the last section (contact), show "Top"
                        setIsAtBottom(index === sections.length - 1);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleScrollNavigate = () => {
        if (isAtBottom) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to next section
            const nextIndex = Math.min(currentSection + 1, sections.length - 1);
            const nextElement = document.getElementById(sections[nextIndex]);
            if (nextElement) {
                nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Availability Badge */}
                    <motion.div
                        className="availability-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <span className="status-dot"></span>
                        Available for Hire
                    </motion.div>

                    <motion.h1
                        className="hero-headline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Ship Your App in
                        <span className="highlight-text"> Days, Not Months</span>
                    </motion.h1>

                    <motion.div
                        className="hero-subheadline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Vibe Coding Expert | AI-Powered Development | React Native Specialist
                    </motion.div>

                    {/* Value Propositions */}
                    <motion.ul
                        className="hero-value-props"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <li><span className="check-icon">✅</span> 6+ Apps Successfully Launched & Live</li>
                        <li><span className="check-icon">✅</span> 10x Faster Development Guaranteed</li>
                        <li><span className="check-icon">✅</span> 8+ Professional Certifications</li>
                        <li><span className="check-icon">✅</span> Ready to Start Tomorrow</li>
                    </motion.ul>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.button
                            className="btn btn-primary btn-lg"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('contact')}
                        >
                            <span>🚀</span> Start Your Project
                        </motion.button>
                        <motion.button
                            className="btn btn-secondary btn-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('projects')}
                        >
                            <span>👀</span> See Live Apps
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="stat-item">
                            <div className="stat-number">6+</div>
                            <div className="stat-label">Apps Shipped & Live</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">3</div>
                            <div className="stat-label">Days Avg Launch</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">12+</div>
                            <div className="stat-label">Vibe Platforms</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <div className="hero-background">
                    <motion.div
                        className="floating-element element-1"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="floating-element element-2"
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="floating-element element-3"
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>

            {/* Smart Scroll Navigator - Fixed Position, Always Visible */}
            <motion.div
                className="scroll-navigator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={handleScrollNavigate}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <motion.div
                    className="scroll-nav-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ y: isAtBottom ? [0, -10, 0] : [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(102, 126, 234, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(102, 126, 234, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}
                >
                    <div className="scroll-arrow">
                        {isAtBottom ? '↑' : '↓'}
                    </div>
                </motion.div>
                <div
                    className="scroll-nav-text"
                    style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--color-text-secondary)',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    {isAtBottom ? 'Top' : 'Next'}
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
