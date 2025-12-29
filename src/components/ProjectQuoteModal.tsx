import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './ProjectQuoteModal.css';

interface ProjectQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    // Basic Information
    fullName: string;
    email: string;
    phone: string;
    company: string;

    // Project Details
    appCategory: string;
    appType: string;
    platforms: string[];

    // Design & Features
    designPreference: string;
    keyFeatures: string;
    authentication: string;

    // Technical Requirements
    backend: string;
    paymentIntegration: string;
    pushNotifications: string;

    // Timeline & Budget
    timeline: string;
    budget: string;
    additionalDetails: string;
}

const ProjectQuoteModal = ({ isOpen, onClose }: ProjectQuoteModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        appCategory: '',
        appType: '',
        platforms: [],
        designPreference: '',
        keyFeatures: '',
        authentication: '',
        backend: '',
        paymentIntegration: '',
        pushNotifications: '',
        timeline: '',
        budget: '',
        additionalDetails: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            platforms: checked
                ? [...prev.platforms, value]
                : prev.platforms.filter(p => p !== value)
        }));
    };

    const calculateEstimatedPrice = (): number => {
        let basePrice = 500;

        // App Type pricing
        const appTypePricing: Record<string, number> = {
            'Native Mobile App (React Native)': 1500,
            'Progressive Web App (PWA)': 800,
            'TWA (Trusted Web Activity)': 600,
            'Web Application': 700
        };
        basePrice += appTypePricing[formData.appType] || 0;

        // Platform multipliers
        const platformCount = formData.platforms.length;
        if (platformCount > 1) {
            basePrice += (platformCount - 1) * 300; // $300 per additional platform
        }

        // Design complexity
        const designPricing: Record<string, number> = {
            'I have a Figma design': 0,
            'I need design from scratch': 800,
            'I have reference apps': 400,
            'Simple/Minimal design': 200
        };
        basePrice += designPricing[formData.designPreference] || 0;

        // Backend pricing
        const backendPricing: Record<string, number> = {
            'Firebase/Supabase': 400,
            'Custom Backend': 1200,
            'No backend needed': 0,
            'Not sure yet': 500
        };
        basePrice += backendPricing[formData.backend] || 0;

        // Payment integration
        if (formData.paymentIntegration === 'Yes, needed') {
            basePrice += 500;
        }

        // Push notifications
        if (formData.pushNotifications === 'Yes, needed') {
            basePrice += 300;
        }

        // Timeline urgency
        if (formData.timeline === 'ASAP (1-3 days)') {
            basePrice += 800; // Rush fee
        }

        return basePrice;
    };

    const formatEmailMessage = (data: FormData): string => {
        const estimatedPrice = calculateEstimatedPrice();

        return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .section { background: #f9f9f9; padding: 20px; margin: 10px 0; border-left: 4px solid #667eea; }
        .section-title { color: #667eea; font-weight: bold; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
        .info-row { display: flex; margin: 8px 0; }
        .label { font-weight: bold; min-width: 180px; color: #555; }
        .value { color: #333; }
        .price-estimate { background: linear-gradient(135deg, #667eea15, #764ba215); border: 2px solid #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
        .price-amount { font-size: 36px; font-weight: bold; color: #667eea; margin: 10px 0; }
        .disclaimer { font-style: italic; color: #666; font-size: 14px; margin-top: 10px; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 NEW PROJECT QUOTE REQUEST</h1>
            <p>Received: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </div>

        <div class="section">
            <div class="section-title">👤 CLIENT INFORMATION</div>
            <div class="info-row"><span class="label">Name:</span><span class="value">${data.fullName}</span></div>
            <div class="info-row"><span class="label">Email:</span><span class="value">${data.email}</span></div>
            <div class="info-row"><span class="label">Phone:</span><span class="value">${data.phone || 'Not provided'}</span></div>
            <div class="info-row"><span class="label">Company:</span><span class="value">${data.company || 'Not provided'}</span></div>
        </div>

        <div class="section">
            <div class="section-title">💡 PROJECT DETAILS</div>
            <div class="info-row"><span class="label">Category:</span><span class="value">${data.appCategory}</span></div>
            <div class="info-row"><span class="label">App Type:</span><span class="value">${data.appType}</span></div>
            <div class="info-row"><span class="label">Platforms:</span><span class="value">${data.platforms.length > 0 ? data.platforms.join(', ') : 'Not specified'}</span></div>
        </div>

        <div class="section">
            <div class="section-title">🎨 DESIGN & FEATURES</div>
            <div class="info-row"><span class="label">Design Preference:</span><span class="value">${data.designPreference}</span></div>
            <div class="info-row"><span class="label">Authentication:</span><span class="value">${data.authentication}</span></div>
            <div class="info-row"><span class="label">Key Features:</span></div>
            <div style="margin-left: 20px; background: white; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${data.keyFeatures}</div>
        </div>

        <div class="section">
            <div class="section-title">⚙️ TECHNICAL REQUIREMENTS</div>
            <div class="info-row"><span class="label">Backend/Database:</span><span class="value">${data.backend}</span></div>
            <div class="info-row"><span class="label">Payment Integration:</span><span class="value">${data.paymentIntegration}</span></div>
            <div class="info-row"><span class="label">Push Notifications:</span><span class="value">${data.pushNotifications}</span></div>
        </div>

        <div class="section">
            <div class="section-title">⏰ TIMELINE & BUDGET</div>
            <div class="info-row"><span class="label">Desired Timeline:</span><span class="value">${data.timeline}</span></div>
            <div class="info-row"><span class="label">Budget Range:</span><span class="value">${data.budget}</span></div>
            ${data.additionalDetails ? `
            <div class="info-row"><span class="label">Additional Details:</span></div>
            <div style="margin-left: 20px; background: white; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${data.additionalDetails}</div>
            ` : ''}
        </div>

        <div class="price-estimate">
            <div style="font-size: 18px; color: #555;">💰 Estimated Price Range</div>
            <div class="price-amount">$${estimatedPrice.toLocaleString()}</div>
            <div class="disclaimer">
                ⚠️ This is an automated estimate based on selected options.<br>
                Final pricing will be provided via email after detailed project review.
            </div>
        </div>

        <div class="footer">
            <p>📧 Sent from CV Website - Project Quote Form</p>
            <p>Please respond to this inquiry within 24-48 hours</p>
        </div>
    </div>
</body>
</html>
        `.trim();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const serviceId = 'service_2jktiyv';
            const templateId = 'template_2ncjsvp';
            const publicKey = 'emUyAd9Fls2seToKD';

            const emailParams = {
                from_name: formData.fullName,
                from_email: formData.email,
                subject: `Project Quote Request - ${formData.appCategory}`,
                message: formatEmailMessage(formData)
            };

            await emailjs.send(serviceId, templateId, emailParams, publicKey);

            setSubmitStatus('success');

            // Close modal and reset after 2 seconds
            setTimeout(() => {
                onClose();
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    company: '',
                    appCategory: '',
                    appType: '',
                    platforms: [],
                    designPreference: '',
                    keyFeatures: '',
                    authentication: '',
                    backend: '',
                    paymentIntegration: '',
                    pushNotifications: '',
                    timeline: '',
                    budget: '',
                    additionalDetails: ''
                });
                setSubmitStatus('idle');
            }, 2000);
        } catch (error) {
            console.error('Email send error:', error);
            setSubmitStatus('error');

            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="quote-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="quote-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="quote-modal-close" onClick={onClose}>✕</button>

                        <div className="quote-modal-header">
                            <h2>🚀 Start Your Project</h2>
                            <p>Fill out this form to get a detailed quote for your app project</p>
                        </div>

                        <form className="quote-form" onSubmit={handleSubmit}>
                            {/* Basic Information */}
                            <div className="form-section">
                                <h3>📋 Basic Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company Name</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Your Company Inc."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="form-section">
                                <h3>💡 Project Details</h3>
                                <div className="form-group">
                                    <label htmlFor="appCategory">App Category *</label>
                                    <select
                                        id="appCategory"
                                        name="appCategory"
                                        value={formData.appCategory}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="E-Commerce / Shopping">🛒 E-Commerce / Shopping</option>
                                        <option value="Social Media / Community">👥 Social Media / Community</option>
                                        <option value="Education / Learning">📚 Education / Learning</option>
                                        <option value="Health & Fitness">💪 Health & Fitness</option>
                                        <option value="Entertainment / Media">🎬 Entertainment / Media</option>
                                        <option value="Business / Productivity">💼 Business / Productivity</option>
                                        <option value="Food & Restaurant">🍔 Food & Restaurant</option>
                                        <option value="Travel & Tourism">✈️ Travel & Tourism</option>
                                        <option value="Finance / Fintech">💰 Finance / Fintech</option>
                                        <option value="Other">🔧 Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>App Type *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="appType"
                                                value="Native Mobile App (React Native)"
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span>📱 Native Mobile App (React Native)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="appType"
                                                value="Progressive Web App (PWA)"
                                                onChange={handleInputChange}
                                            />
                                            <span>🌐 Progressive Web App (PWA)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="appType"
                                                value="TWA (Trusted Web Activity)"
                                                onChange={handleInputChange}
                                            />
                                            <span>🔗 TWA (Trusted Web Activity)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="appType"
                                                value="Web Application"
                                                onChange={handleInputChange}
                                            />
                                            <span>💻 Web Application</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Publishing Platforms *</label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value="iOS App Store"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>🍎 iOS App Store</span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value="Google Play Store"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>🤖 Google Play Store</span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value="Web Hosting"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>🌐 Web Hosting</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Design & Features */}
                            <div className="form-section">
                                <h3>🎨 Design & Features</h3>
                                <div className="form-group">
                                    <label>Design Preference *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="designPreference"
                                                value="I have a Figma design"
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span>I have a Figma design</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="designPreference"
                                                value="I need design from scratch"
                                                onChange={handleInputChange}
                                            />
                                            <span>I need design from scratch</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="designPreference"
                                                value="I have reference apps"
                                                onChange={handleInputChange}
                                            />
                                            <span>I have reference apps</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="designPreference"
                                                value="Simple/Minimal design"
                                                onChange={handleInputChange}
                                            />
                                            <span>Simple/Minimal design</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="keyFeatures">Key Features *</label>
                                    <textarea
                                        id="keyFeatures"
                                        name="keyFeatures"
                                        value={formData.keyFeatures}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        placeholder="Describe the main features you need (e.g., user profiles, messaging, payments, etc.)"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>User Authentication *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="authentication"
                                                value="Email/Password"
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span>Email/Password</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="authentication"
                                                value="Social Login (Google, Apple, etc.)"
                                                onChange={handleInputChange}
                                            />
                                            <span>Social Login (Google, Apple, etc.)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="authentication"
                                                value="Phone Number (OTP)"
                                                onChange={handleInputChange}
                                            />
                                            <span>Phone Number (OTP)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="authentication"
                                                value="No authentication needed"
                                                onChange={handleInputChange}
                                            />
                                            <span>No authentication needed</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Requirements */}
                            <div className="form-section">
                                <h3>⚙️ Technical Requirements</h3>
                                <div className="form-group">
                                    <label>Backend/Database *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="backend"
                                                value="Firebase/Supabase"
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span>Firebase/Supabase</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="backend"
                                                value="Custom Backend"
                                                onChange={handleInputChange}
                                            />
                                            <span>Custom Backend</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="backend"
                                                value="No backend needed"
                                                onChange={handleInputChange}
                                            />
                                            <span>No backend needed</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="backend"
                                                value="Not sure yet"
                                                onChange={handleInputChange}
                                            />
                                            <span>Not sure yet</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Payment Integration *</label>
                                        <select
                                            name="paymentIntegration"
                                            value={formData.paymentIntegration}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select option</option>
                                            <option value="Yes, needed">Yes, needed</option>
                                            <option value="No, not needed">No, not needed</option>
                                            <option value="Maybe later">Maybe later</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Push Notifications *</label>
                                        <select
                                            name="pushNotifications"
                                            value={formData.pushNotifications}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select option</option>
                                            <option value="Yes, needed">Yes, needed</option>
                                            <option value="No, not needed">No, not needed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline & Budget */}
                            <div className="form-section">
                                <h3>⏰ Timeline & Budget</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="timeline">Desired Timeline *</label>
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="ASAP (1-3 days)">⚡ ASAP (1-3 days)</option>
                                            <option value="1 week">📅 1 week</option>
                                            <option value="2-4 weeks">📆 2-4 weeks</option>
                                            <option value="Flexible">🕐 Flexible</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="budget">Budget Range *</label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select budget range</option>
                                            <option value="Under $500">💵 Under $500</option>
                                            <option value="$500 - $1,000">💰 $500 - $1,000</option>
                                            <option value="$1,000 - $3,000">💸 $1,000 - $3,000</option>
                                            <option value="$3,000 - $5,000">💎 $3,000 - $5,000</option>
                                            <option value="$5,000+">🏆 $5,000+</option>
                                            <option value="Not sure / Need estimate">❓ Not sure / Need estimate</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="additionalDetails">Additional Details</label>
                                    <textarea
                                        id="additionalDetails"
                                        name="additionalDetails"
                                        value={formData.additionalDetails}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Any other information, special requirements, or questions you have..."
                                    />
                                </div>
                            </div>

                            {/* Price Estimate Display */}
                            {formData.appType && formData.designPreference && formData.backend && formData.timeline && (
                            <div className="price-estimate">
                                <div className="estimate-header">
                                    <span style={{ fontSize: '24px' }}>💰</span>
                                    <h4>Estimated Project Cost</h4>
                                </div>
                                <div className="estimate-amount">
                                    ${calculateEstimatedPrice().toLocaleString()}
                                </div>
                                <div className="estimate-disclaimer">
                                    ⚠️ Bu otomatik bir tahmindir. Gerçek fiyat, proje detaylarının incelenmesinden sonra mail ile gönderilecektir.
                                </div>
                            </div>
                            )}

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="status-message success">
                                    ✅ Quote request sent successfully! I'll get back to you within 24 hours.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="status-message error">
                                    ❌ Failed to send request. Please try again or email me directly.
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="form-actions">
                                <motion.button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? '⏳ Sending...' : '🚀 Get Your Quote'}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectQuoteModal;
