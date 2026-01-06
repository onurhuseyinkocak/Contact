import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingCard from './FloatingCard';
import ProjectQuoteModal from './ProjectQuoteModal';
import './Hero.css';


const Hero = () => {
    const [showQuoteModal, setShowQuoteModal] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                {/* Bangkok Announcement Badge - Floating */}
                <FloatingCard
                    className="availability-card bangkok-card"
                    delay={0.1}
                    floatIntensity="low"
                    enableTilt={false}
                >
                    <div className="bangkok-badge">
                        <span className="bangkok-dot"></span>
                        <span className="bangkok-text">
                            <img
                                src="https://flagcdn.com/w40/th.png"
                                alt="Thailand"
                                className="bangkok-flag-img"
                            />
                            In Bangkok Jan 16-23
                        </span>
                        <button
                            className="bangkok-meet-btn"
                            onClick={() => scrollToSection('contact')}
                        >
                            Let's Meet
                        </button>
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

