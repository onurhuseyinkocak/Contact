import { motion } from 'framer-motion';
import './BangkokBanner.css';

const BangkokBanner = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            className="bangkok-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="bangkok-banner-content">
                <div className="bangkok-status-indicator">
                    <span className="bangkok-pulse-dot"></span>
                    <span className="bangkok-pulse-ring"></span>
                </div>

                <div className="bangkok-text-wrapper">
                    <span className="bangkok-location-icon">🇹🇭</span>
                    <p className="bangkok-message">
                        <span className="bangkok-highlight">I'll be in Bangkok</span>
                        <span className="bangkok-dates">January 16-23, 2026</span>
                        <span className="bangkok-purpose">Open for in-person business meetings</span>
                    </p>
                </div>

                <motion.button
                    className="bangkok-cta-button"
                    onClick={scrollToContact}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="bangkok-cta-icon">📅</span>
                    Schedule a Meeting
                </motion.button>
            </div>
        </motion.div>
    );
};

export default BangkokBanner;
