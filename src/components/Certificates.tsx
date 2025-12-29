import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cvData } from '../data/data';
import type { Certificate } from '../types/types';
import './Certificates.css';

const Certificates = () => {
    const { certificates } = cvData;
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    return (
        <section id="certificates" className="section certificates-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-center">
                        🎓 Education & Certifications
                    </h2>
                    <p className="section-subtitle text-center">
                        Professional credentials and continuous learning journey
                    </p>

                    <div className="certificates-grid">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                className="certificate-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                onClick={() => setSelectedCert(cert)}
                                style={{ cursor: 'pointer' }}
                            >
                                {cert.image && (
                                    <div className="certificate-image-wrapper">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="certificate-image"
                                            loading="lazy"
                                        />
                                        <div className="certificate-overlay">
                                            <span className="view-certificate">🔍 View Certificate</span>
                                        </div>
                                    </div>
                                )}

                                <div className="certificate-content">
                                    <h3 className="certificate-title">{cert.title}</h3>
                                    <p className="certificate-issuer">
                                        <span className="issuer-icon">🏛️</span>
                                        {cert.issuer}
                                    </p>
                                    <p className="certificate-date">
                                        <span className="date-icon">📅</span>
                                        {cert.date}
                                    </p>

                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="verify-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            ✓ Verify Credential
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Certificate Modal Viewer */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        className="certificate-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            className="certificate-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setSelectedCert(null)}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>{selectedCert.title}</h3>
                                    <p className="modal-issuer">
                                        <span>🏛️</span> {selectedCert.issuer}
                                    </p>
                                    <p className="modal-date">
                                        <span>📅</span> {selectedCert.date}
                                    </p>
                                </div>

                                <div className="modal-image-container">
                                    <img
                                        src={selectedCert.image}
                                        alt={selectedCert.title}
                                        className="modal-image"
                                    />
                                </div>

                                {selectedCert.credentialUrl && (
                                    <div className="modal-footer">
                                        <a
                                            href={selectedCert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="modal-verify-btn"
                                        >
                                            ✓ Verify Credential Externally
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
