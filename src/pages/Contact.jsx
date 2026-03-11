import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', location: '', message: '' });
        }, 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-4"
                    >
                        Get in Touch
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Ready to start your dream project? Have questions about our designs? Let us know how we can help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Contact Info</h2>

                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-brand-light/10 text-brand-accent rounded-xl">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark mb-1">Our Headquarters</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    45 Tech Park, Koramangala<br />
                                    Block 3<br />
                                    Bengaluru, Karnataka 560034
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-brand-light/10 text-brand-accent rounded-xl">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark mb-1">Phone Number</h3>
                                <p className="text-gray-600">
                                    +91 98765 43210<br />
                                    Mon-Fri 9am-6pm IST
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-brand-light/10 text-brand-accent rounded-xl">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark mb-1">Email Address</h3>
                                <p className="text-gray-600">
                                    info@buildsmart.in<br />
                                    support@buildsmart.in
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/20 transition-colors z-10" />
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Map View" />
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <span className="glass px-4 py-2 font-bold text-brand-dark rounded-full shadow-lg">Google Maps</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-2 bg-gray-50 border border-gray-100 p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                                    >
                                        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold font-heading text-brand-dark mb-4">Message Sent!</h3>
                                    <p className="text-xl text-gray-600 max-w-md">
                                        Thank you for contacting BuildSmart. Our team will get back to you shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold font-heading text-brand-dark mb-8">Send us a Message</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                                                placeholder="+91 98765 00000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                                                placeholder="City, State"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us about your project requirements..."
                                        ></textarea>
                                    </div>

                                    <Button type="submit" className="w-full py-4 text-lg flex items-center justify-center gap-2 group">
                                        Send Message <Send className="group-hover:translate-x-1 transition-transform" size={20} />
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default Contact;
