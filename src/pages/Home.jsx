import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Box, Sparkles, HardHat, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
    const features = [
        {
            icon: <Calculator className="w-8 h-8 text-brand-accent" />,
            title: "Cost Calculator",
            description: "Get real-time, accurate construction cost estimates based on current market rates and material choices."
        },
        {
            icon: <Box className="w-8 h-8 text-brand-accent" />,
            title: "3D House Viewer",
            description: "Explore your future home with interactive 3D models before a single brick is laid."
        },
        {
            icon: <Sparkles className="w-8 h-8 text-brand-accent" />,
            title: "AI Design Recommendations",
            description: "Our AI analyzes your plot size and budget to suggest the most optimal and beautiful house designs."
        },
        {
            icon: <HardHat className="w-8 h-8 text-brand-accent" />,
            title: "Trusted Builders",
            description: "Connect with verified and highly-rated construction professionals in your area."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-brand-accent" />,
            title: "Progress Tracking",
            description: "Monitor your construction project milestones, expenses, and timelines all in one dashboard."
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/40 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        alt="Modern Architecture"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight">
                            Plan and Build Your <span className="text-brand-accent">Dream Home</span> Smarter
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light">
                            The all-in-one AI platform to design, estimate, and manage your construction project with precision.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/design">
                                <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
                                    Explore Designs
                                </Button>
                            </Link>
                            <Link to="/build">
                                <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                                    Start Building
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold font-heading text-brand-dark mb-4"
                        >
                            Powerful Features for Smart Building
                        </motion.h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to turn your dream plot into a completed home, effortlessly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="flex flex-col items-start gap-4 h-full border-none">
                                <div className="p-4 rounded-xl bg-brand-light/10 inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-brand-dark">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Designs Teaser */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold font-heading text-brand-dark mb-4">
                                Inspiring modern designs
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl">
                                Browse our curated collection of architectural masterpieces ready to be built.
                            </p>
                        </div>
                        <Link to="/design" className="flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-accent transition-colors group">
                            View all designs <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item * 0.1 }}
                                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={`https://images.unsplash.com/photo-${item === 1 ? '1600596542815-ffad4c1539a9' : item === 2 ? '1512917774080-9991f1c4c750' : '1600607686527-6fb886090705'}?q=80&w=800&auto=format&fit=crop`}
                                        alt="House Design"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20 glass px-3 py-1 rounded-full text-sm font-semibold text-brand-dark">
                                        {item === 1 ? "Modern Villa" : item === 2 ? "Contemporary 3BHK" : "Minimalist 2BHK"}
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 font-medium">Est. Setup: 6 Months</span>
                                        <span className="text-brand-accent font-bold">₹{item * 40}L - ₹{item * 50}L</span>
                                    </div>
                                    <h3 className="text-xl font-bold font-heading text-brand-dark">The {item === 1 ? "Oasis" : item === 2 ? "Horizon" : "Zen"} Residence</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F2A900 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                        Ready to build your smart home?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Join thousands of users who have successfully planned and built their dream homes with BuildSmart.
                    </p>
                    <Link to="/build">
                        <Button variant="primary" className="text-xl px-10 py-5">
                            Start Your Project Free
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
