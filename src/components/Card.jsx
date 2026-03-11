import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', dark = false, hover = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={hover ? { y: -5 } : {}}
            className={`rounded-2xl p-6 ${dark ? 'glass-dark' : 'glass'} ${hover ? 'hover:shadow-2xl transition-shadow duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
