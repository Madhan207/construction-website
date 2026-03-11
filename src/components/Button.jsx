import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium rounded-xl transition-all duration-300 focus:outline-none";

    const variants = {
        primary: "bg-brand-accent text-brand-dark hover:bg-yellow-400 shadow-md hover:shadow-lg",
        secondary: "bg-brand-light text-white hover:bg-brand-dark border border-white/10 shadow-md",
        outline: "bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-gray-800 hover:text-white",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
