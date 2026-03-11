import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Design Gallery', path: '/design' },
        { name: 'Build Your Home', path: '/build' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // We determine styling based on route and scroll.
    // Home page has a dark hero, other pages might not.
    const isHome = location.pathname === '/';
    const isDarkBg = isHome && !scrolled;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <Home className={`w-8 h-8 ${isDarkBg ? 'text-brand-accent' : 'text-brand-dark'}`} />
                    <span className={`font-heading font-bold text-2xl tracking-tight ${isDarkBg ? 'text-white' : 'text-brand-dark'}`}>
                        BuildSmart
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-medium transition-colors hover:text-brand-accent ${location.pathname === link.path
                                    ? 'text-brand-accent'
                                    : (isDarkBg ? 'text-gray-200' : 'text-gray-600')
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/build">
                        <Button variant={isDarkBg ? 'primary' : 'primary'}>
                            Start Building
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className={isDarkBg ? 'text-white' : 'text-brand-dark'}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-6 border-t border-gray-100">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`font-medium text-lg ${location.pathname === link.path ? 'text-brand-accent' : 'text-gray-800'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/build" onClick={() => setIsOpen(false)}>
                        <Button variant="primary">Start Building</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
