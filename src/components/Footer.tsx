import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <motion.div
                    className="footer-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-text">
                        <p>© {currentYear} Onur Hüseyin Koçak. All rights reserved.</p>
                        <p className="footer-tagline">Built with ❤️ using React & Framer Motion</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
