import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cvData } from "../data/data";
import type { Certificate } from "../types/types";
import "./Certificates.css";

const Certificates = () => {
    const { certificates } = cvData;
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    // 🔒 HARD BODY LOCK
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCert]);

    return (
        <>
            <section id="certificates" className="section certificates-section">
                <div className="container">
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
                                className="certificate-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedCert(cert)}
                            >
                                <div className="certificate-image-wrapper">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="certificate-image"
                                    />
                                    <div className="certificate-overlay">
                                        🔍 View Certificate
                                    </div>
                                </div>

                                <div className="certificate-content">
                                    <h3>{cert.title}</h3>
                                    <p>🏛️ {cert.issuer}</p>
                                    <p>📅 {cert.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== MODAL (PORTAL) ===================== */}
            {createPortal(
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
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="modal-close"
                                    onClick={() => setSelectedCert(null)}
                                >
                                    ✕
                                </button>

                                <h3>{selectedCert.title}</h3>
                                <p>🏛️ {selectedCert.issuer}</p>
                                <p>📅 {selectedCert.date}</p>

                                <div className="modal-image-container">
                                    <img
                                        src={selectedCert.image}
                                        alt={selectedCert.title}
                                        className="modal-image"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default Certificates;
