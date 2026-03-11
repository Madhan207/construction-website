import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <Home className="w-8 h-8 text-brand-accent" />
                        <span className="font-heading font-bold text-3xl tracking-tight text-white">
                            BuildSmart
                        </span>
                    </Link>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Plan and build your dream home smarter with AI-powered insights, real-time cost estimation, and 3D visualization.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-heading font-semibold text-xl mb-6 text-white z-10 relative">Features</h3>
                    <ul className="space-y-4">
                        <li><Link to="/build" className="text-gray-400 hover:text-brand-accent transition-colors">Construction Cost Calculator</Link></li>
                        <li><Link to="/design" className="text-gray-400 hover:text-brand-accent transition-colors">3D House Viewer</Link></li>
                        <li><Link to="/build" className="text-gray-400 hover:text-brand-accent transition-colors">AI Recommendations</Link></li>
                        <li><Link to="/" className="text-gray-400 hover:text-brand-accent transition-colors">Trusted Builders</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading font-semibold text-xl mb-6 text-white">Quick Links</h3>
                    <ul className="space-y-4">
                        <li><Link to="/" className="text-gray-400 hover:text-brand-accent transition-colors">Home Page</Link></li>
                        <li><Link to="/design" className="text-gray-400 hover:text-brand-accent transition-colors">Design Gallery</Link></li>
                        <li><Link to="/build" className="text-gray-400 hover:text-brand-accent transition-colors">Build Your Home</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-brand-accent transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading font-semibold text-xl mb-6 text-white">Contact Info</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-brand-accent mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-400">45 Tech Park, Koramangala<br />Bengaluru, KA 560034</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="text-brand-accent shrink-0" size={20} />
                            <span className="text-gray-400">+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Mail className="text-brand-accent shrink-0" size={20} />
                            <span className="text-gray-400">info@buildsmart.in</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 font-medium">
                <p>&copy; {new Date().getFullYear()} BuildSmart Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
