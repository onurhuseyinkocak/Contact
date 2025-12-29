import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingCard from './FloatingCard';
import ProjectQuoteModal from './ProjectQuoteModal';
import './Hero.css';

const sections = ['hero', 'about', 'projects', 'experience', 'certificates', 'contact'];

const Hero = () => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [showQuoteModal, setShowQuoteModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            sections.forEach((sectionId, index) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                        setCurrentSection(index);
                        setIsAtBottom(index === sections.length - 1);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const nextIndex = Math.min(currentSection + 1, sections.length - 1);
            const nextElement = document.getElementById(sections[nextIndex]);
            if (nextElement) {
                nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const stats = [
        { number: '6+', label: 'Apps Live', icon: '🚀' },
        { number: '10x', label: 'Faster Dev', icon: '⚡' },
        { number: '8+', label: 'Certificates', icon: '🎓' },
        { number: '100%', label: 'On Time', icon: '✨' }
    ];

    return (
        <section id="hero" className="hero-section">
            <div className="hero-container">
                {/* Availability Badge - Floating */}
                <FloatingCard
                    className="availability-card"
                    delay={0.1}
                    floatIntensity="low"
                    enableTilt={false}
                >
                    <div className="availability-badge-new">
                        <span className="status-dot-new"></span>
                        <span>Available for Hire</span>
                    </div>
                </FloatingCard>

                {/* Main Headline Card */}
                <FloatingCard
                    className="headline-card"
                    delay={0.3}
                    floatIntensity="medium"
                >
                    <div className="headline-content">
                        <h1 className="hero-headline-new">
                            Ship Your App
                        </h1>
                        <h1 className="hero-headline-new hero-headline-emphasis">
                            in <span className="highlight-text-new">Days, Not Months</span>
                        </h1>

                        <p className="hero-subheadline-new">
                            Vibe Coding Expert | AI-Powered Development | React Native Specialist
                        </p>
                    </div>
                </FloatingCard>

                {/* Stats Cards Grid */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <FloatingCard
                            key={index}
                            className="stat-card"
                            delay={0.5 + index * 0.1}
                            floatIntensity="high"
                        >
                            <div className="stat-content">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </FloatingCard>
                    ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                    className="hero-cta-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <button
                        className="hero-cta-primary"
                        onClick={() => setShowQuoteModal(true)}
                    >
                        <span className="cta-icon">🚀</span>
                        Start Your Project
                    </button>
                    <button
                        className="hero-cta-secondary"
                        onClick={() => scrollToSection('projects')}
                    >
                        <span className="cta-icon">👀</span>
                        See Live Apps
                    </button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.button type="button" className="scroll-indicator-new"
                    onClick={handleScrollNavigate}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="scroll-icon">
                        {isAtBottom ? '⬆️' : '⬇️'}
                    </div>
                    <span className="scroll-text">
                        {isAtBottom ? 'TOP' : 'NEXT'}
                    </span>
                </motion.button>
            </div>

            {/* Project Quote Modal */}
            <ProjectQuoteModal
                isOpen={showQuoteModal}
                onClose={() => setShowQuoteModal(false)}
            />
        </section>
    );
};

export default Hero;

