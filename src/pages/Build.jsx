import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, Building, Layers, Ruler } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Build = () => {
    const [plotSize, setPlotSize] = useState('');
    const [floors, setFloors] = useState('1');
    const [quality, setQuality] = useState('Standard');
    const [showResult, setShowResult] = useState(false);
    const [aiBudget, setAiBudget] = useState('');
    const [aiResult, setAiResult] = useState(null);

    const calculateCost = (e) => {
        e.preventDefault();
        if (!plotSize) return;
        setShowResult(true);
    };

    const getAiRecommendation = (e) => {
        e.preventDefault();
        if (!aiBudget) return;
        setAiResult("Based on your budget of ₹" + aiBudget + "L, we highly recommend our 'Urban Duplex' or 'The Horizon' designs which offer the best value for your investment with standard quality materials.");
    };

    const baseRate = 2000;
    const multiplier = quality === 'Basic' ? 0.8 : quality === 'Premium' ? 1.5 : 1;
    const area = parseFloat(plotSize || 0);
    const floorCount = parseInt(floors);

    const totalCost = area * floorCount * baseRate * multiplier;
    const materialCost = totalCost * 0.65;
    const laborCost = totalCost * 0.35;

    const quantities = {
        cement: Math.round((area * floorCount) * 0.4 * multiplier), // Bags
        steel: Math.round((area * floorCount) * 4 * multiplier), // Kg
        bricks: Math.round((area * floorCount) * 20 * multiplier), // Count
        sand: Math.round((area * floorCount) * 1.5 * multiplier), // CFT
    };

    const formatCurrency = (val) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-4"
                    >
                        Build Your Home
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Plan your budget precisely with our advanced construction estimation tools and AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Calculator Form */}
                    <Card className="col-span-1 border-t-4 border-brand-accent">
                        <div className="flex items-center gap-3 mb-6">
                            <Calculator className="text-brand-accent" size={28} />
                            <h2 className="text-2xl font-bold font-heading text-brand-dark">Cost Calculator</h2>
                        </div>

                        <form onSubmit={calculateCost} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Plot Size (sq.ft)</label>
                                <div className="relative">
                                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="number"
                                        value={plotSize}
                                        onChange={e => setPlotSize(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. 1200"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Floors</label>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <select
                                            value={floors}
                                            onChange={e => setFloors(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent outline-none appearance-none"
                                        >
                                            {[1, 2, 3, 4].map(num => <option key={num} value={num}>{num} Floor{num > 1 ? 's' : ''}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Build Quality</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <select
                                            value={quality}
                                            onChange={e => setQuality(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent outline-none appearance-none"
                                        >
                                            <option>Basic</option>
                                            <option>Standard</option>
                                            <option>Premium</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-4 text-lg">Calculate Estimate</Button>
                        </form>
                    </Card>

                    {/* Results Dashboard */}
                    <div className="col-span-1">
                        <AnimatePresence mode="wait">
                            {!showResult ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-8 text-center min-h-[400px]"
                                >
                                    <div>
                                        <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-500 mb-2">Awaiting Details</h3>
                                        <p className="text-gray-400">Enter your plot metrics to generate a comprehensive breakdown.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.4 }}
                                    className="h-full bg-brand-dark rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-bl-full pointer-events-none" />

                                    <h3 className="text-gray-300 uppercase tracking-widest text-sm font-bold mb-2">Estimated Total Cost</h3>
                                    <div className="text-5xl font-heading font-bold text-brand-accent mb-8">
                                        {formatCurrency(totalCost)}
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Material Cost (65%)</span>
                                                <span className="font-bold">{formatCurrency(materialCost)}</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div className="bg-brand-accent h-2 rounded-full" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Labor Cost (35%)</span>
                                                <span className="font-bold">{formatCurrency(laborCost)}</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <h4 className="font-bold mb-4">Material Quantities Required</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <span className="text-gray-400 text-sm block">Cement</span>
                                                <span className="font-bold text-lg">{quantities.cement.toLocaleString()} Bags</span>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <span className="text-gray-400 text-sm block">Steel</span>
                                                <span className="font-bold text-lg">{quantities.steel.toLocaleString()} Kg</span>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <span className="text-gray-400 text-sm block">Bricks</span>
                                                <span className="font-bold text-lg">{quantities.bricks.toLocaleString()} Nos</span>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <span className="text-gray-400 text-sm block">Sand</span>
                                                <span className="font-bold text-lg">{quantities.sand.toLocaleString()} CFT</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* AI Recommendation */}
                <Card className="border border-brand-accent/20 bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-brand-accent opacity-10 blur-sm pointer-events-none">
                        <Sparkles size={200} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-brand-accent/20 text-brand-accent rounded-full">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-2xl font-bold font-heading text-brand-dark">AI Design Match</h2>
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Not sure what to build? Tell our AI engine your budget limit in Lakhs, and we'll instantly recommend the most suitable premium designs from our gallery matching your criteria.
                            </p>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <form onSubmit={getAiRecommendation} className="flex gap-2">
                                <input
                                    type="number"
                                    value={aiBudget}
                                    onChange={e => setAiBudget(e.target.value)}
                                    placeholder="Budget in Lakhs (e.g. 50)"
                                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent outline-none"
                                    required
                                />
                                <Button type="submit">Ask AI</Button>
                            </form>

                            <AnimatePresence>
                                {aiResult && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6 p-4 bg-white rounded-xl shadow border border-brand-accent/30 text-brand-dark font-medium flex items-start gap-3"
                                    >
                                        <Sparkles className="text-brand-accent shrink-0 mt-0.5" size={20} />
                                        <p>{aiResult}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default Build;
