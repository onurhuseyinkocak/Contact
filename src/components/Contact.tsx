import { useState } from 'react';
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

    const socialIcons: Record<string, string> = {
        github: '🐙',
        linkedin: '💼',
        twitter: '🐦',
        envelope: '✉️',
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
                                    <div>
                                        <div className="info-label">Email</div>
                                        <a href={`mailto:${personal.email}`} className="info-value">
                                            {personal.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <span className="info-icon">📍</span>
                                    <div>
                                        <div className="info-label">Location</div>
                                        <div className="info-value">{personal.location}</div>
                                    </div>
                                </div>

                                {personal.phone && (
                                    <div className="info-item">
                                        <span className="info-icon">📞</span>
                                        <div>
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
