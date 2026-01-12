import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100,
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    <div className="splash-content">
                        <motion.div
                            className="splash-logo"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                        >
                            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="splashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="100%" stopColor="#764ba2" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d="M50 10 L60 45 L45 45 L55 90 L30 50 L45 50 L35 10 Z"
                                    fill="url(#splashGradient)"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="splash-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <h1 className="splash-title">Onur Koçak</h1>
                            <p className="splash-subtitle">Vibe Coding</p>
                        </motion.div>

                        <motion.div
                            className="splash-loader"
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                        >
                            <div className="loader-bar"></div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
