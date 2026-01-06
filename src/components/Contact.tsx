import { useState, type JSX } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { cvData } from '../data/data';
import './Contact.css';

const Contact = () => {
    const { personal, social } = cvData;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = e.currentTarget;

        try {
            // EmailJS configuration
            // Replace these with your actual EmailJS credentials
            const serviceId = 'service_2jktiyv';  // Get from EmailJS dashboard
            const templateId = 'template_2ncjsvp'; // Get from EmailJS dashboard
            const publicKey = 'emUyAd9Fls2seToKD';   // Get from EmailJS dashboard

            // Send email via EmailJS
            await emailjs.sendForm(
                serviceId,
                templateId,
                form,
                publicKey
            );

            setSubmitStatus('success');
            form.reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } catch (error) {
            console.error('Email send error:', error);
            setSubmitStatus('error');

            // Reset error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialIcons: Record<string, JSX.Element> = {
        github: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        linkedin: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        twitter: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        envelope: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-center">
                        Get In Touch
                    </h2>
                    <p className="section-subtitle text-center">
                        Let's work together! Feel free to reach out for collaborations or just a friendly chat.
                    </p>

                    <div className="contact-content">
                        {/* Contact Info */}
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="info-card glass-card">
                                <h3>Contact Information</h3>

                                <div className="info-item">
                                    <span className="info-icon">📧</span>
                                    <div className="info-details">
                                        <div className="info-label">Email</div>
                                        <a href={`mailto:${personal.email}`} className="info-value">
                                            {personal.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <span className="info-icon">📍</span>
                                    <div className="info-details">
                                        <div className="info-label">Location</div>
                                        <div className="info-value">{personal.location}</div>
                                    </div>
                                </div>

                                {personal.phone && (
                                    <div className="info-item">
                                        <span className="info-icon">📞</span>
                                        <div className="info-details">
                                            <div className="info-label">Phone</div>
                                            <div className="info-value">{personal.phone}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Social Links */}
                                <div className="social-links">
                                    <h4>Connect With Me</h4>
                                    <div className="social-icons">
                                        {social.map((link) => (
                                            <motion.a
                                                key={link.platform}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-icon"
                                                whileHover={{ scale: 1.1, y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                title={link.platform}
                                            >
                                                {socialIcons[link.icon] || '🔗'}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="contact-form-wrapper"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <form className="contact-form glass-card" onSubmit={handleSubmit}>
                                <h3>Send Me a Message</h3>

                                {submitStatus === 'success' && (
                                    <div style={{
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        backgroundColor: 'rgba(67, 233, 123, 0.1)',
                                        border: '1px solid rgba(67, 233, 123, 0.3)',
                                        borderRadius: '8px',
                                        color: '#43e97b'
                                    }}>
                                        ✅ Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div style={{
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                                        border: '1px solid rgba(245, 87, 108, 0.3)',
                                        borderRadius: '8px',
                                        color: '#f5576c'
                                    }}>
                                        ❌ Failed to send message. Please try again or email me directly.
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="from_name"
                                        placeholder="Your Name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="from_email"
                                        placeholder="your.email@example.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="What's this about?"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Your message here..."
                                        required
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    disabled={isSubmitting}
                                    style={{
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Sending... ⏳' : 'Send Message 🚀'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
