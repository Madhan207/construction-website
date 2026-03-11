import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

// A dynamic 3D house model that changes based on type and floors
const HouseModel = ({ house }) => {
    if (!house) return null;
    const { type, floors } = house;

    const isVilla = type === 'Villa';
    const is1BHK = type === '1BHK';
    const is2BHK = type === '2BHK';
    const is3BHK = type === '3BHK';

    let w = 4;
    let d = 3.5;
    let h = 2;

    if (is1BHK) { w = 3; d = 2.5; }
    if (is2BHK) { w = 4; d = 3; }
    if (is3BHK) { w = 4.8; d = 3.8; }
    if (isVilla) { w = 5.5; d = 4.5; }

    const wallColor = isVilla ? "#f1f5f9" : is3BHK ? "#e2e8f0" : "#ffffff";
    const roofColor = isVilla ? "#1e293b" : is3BHK ? "#334155" : "#475569";
    const roofHeight = isVilla ? 2.5 : 1.8;
    const baseWidth = w + 4;
    const baseDepth = d + 4;

    return (
        <group position={[0, -1, 0]}>
            {/* Garden / Ground */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[baseWidth, 0.5, baseDepth]} />
                <meshStandardMaterial color="#4ade80" /> {/* Grass green */}
            </mesh>

            {/* Path to door */}
            <mesh position={[0, 0.51, d / 2 + 1]} receiveShadow>
                <boxGeometry args={[1.5, 0.02, 2]} />
                <meshStandardMaterial color="#94a3b8" /> {/* Stone path */}
            </mesh>

            {/* Base/Floor of House */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[w + 1, 1.02, d + 1]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Floors */}
            {Array.from({ length: floors }).map((_, i) => (
                <group key={i} position={[0, 1.5 + i * h, 0]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[w, h, d]} />
                        <meshStandardMaterial color={wallColor} />
                    </mesh>

                    {/* Window Frame Front Left */}
                    <mesh position={[-w / 3, 0.2, d / 2 + 0.01]} castShadow>
                        <boxGeometry args={[1, 1.2, 0.1]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    {/* Window Glass Front Left */}
                    <mesh position={[-w / 3, 0.2, d / 2 + 0.02]} castShadow>
                        <boxGeometry args={[0.8, 1, 0.1]} />
                        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} />
                    </mesh>

                    {/* Window Frame Front Right */}
                    <mesh position={[w / 3, 0.2, d / 2 + 0.01]} castShadow>
                        <boxGeometry args={[1, 1.2, 0.1]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    {/* Window Glass Front Right */}
                    <mesh position={[w / 3, 0.2, d / 2 + 0.02]} castShadow>
                        <boxGeometry args={[0.8, 1, 0.1]} />
                        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} />
                    </mesh>

                    {/* Door (Only First Floor) */}
                    {i === 0 && (
                        <group position={[0, -0.2, d / 2 + 0.02]}>
                            {/* Door Frame */}
                            <mesh position={[0, 0, -0.01]} castShadow>
                                <boxGeometry args={[1.2, 1.8, 0.1]} />
                                <meshStandardMaterial color="#1e293b" />
                            </mesh>
                            {/* Actual Door */}
                            <mesh castShadow>
                                <boxGeometry args={[1, 1.6, 0.1]} />
                                <meshStandardMaterial color="#b45309" roughness={0.8} />
                            </mesh>
                            {/* Door Knob */}
                            <mesh position={[0.3, 0, 0.06]} castShadow>
                                <sphereGeometry args={[0.06, 16, 16]} />
                                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                            </mesh>
                        </group>
                    )}

                    {/* Balcony for upper floors in larger homes */}
                    {i > 0 && (isVilla || is3BHK) && (
                        <group position={[0, -h / 2 + 0.1, d / 2 + 0.2]}>
                            {/* Balcony Base */}
                            <mesh castShadow receiveShadow>
                                <boxGeometry args={[w - 1, 0.1, 0.8]} />
                                <meshStandardMaterial color="#cbd5e1" />
                            </mesh>
                            {/* Balcony Railing */}
                            <mesh position={[0, 0.4, 0.35]} castShadow receiveShadow>
                                <boxGeometry args={[w - 1, 0.8, 0.05]} />
                                <meshStandardMaterial color="#94a3b8" transparent opacity={0.6} />
                            </mesh>
                            {/* Handrail */}
                            <mesh position={[0, 0.8, 0.35]} castShadow receiveShadow>
                                <boxGeometry args={[w - 1 + 0.05, 0.05, 0.1]} />
                                <meshStandardMaterial color="#1e293b" />
                            </mesh>
                        </group>
                    )}
                </group>
            ))}

            {/* Roof */}
            <group position={[0, 1 + floors * h + roofHeight / 2 - 0.5, 0]}>
                <mesh castShadow receiveShadow>
                    <coneGeometry args={[Math.max(w, d) / 1.4 + 0.8, roofHeight, 4]} rotation={[0, Math.PI / 4, 0]} />
                    <meshStandardMaterial color={roofColor} />
                </mesh>
                {/* Chimney for Villa */}
                {isVilla && (
                    <mesh position={[-w / 3, roofHeight * 0.4, -d / 4]} castShadow receiveShadow>
                        <boxGeometry args={[0.6, 1.5, 0.6]} />
                        <meshStandardMaterial color="#7c2d12" />
                    </mesh>
                )}
            </group>

            {/* Decoration: Simple Tree 1 */}
            <group position={[-w / 2 - 1, 0.5, d / 2]}>
                <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
                    <meshStandardMaterial color="#78350f" />
                </mesh>
                <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[0.8, 16, 16]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.9} />
                </mesh>
            </group>

            {/* Decoration: Simple Tree 2 (Taller) */}
            <group position={[w / 2 + 1.2, 0.5, -d / 2 - 0.5]}>
                <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
                    <meshStandardMaterial color="#78350f" />
                </mesh>
                <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[1.2, 16, 16]} />
                    <meshStandardMaterial color="#16a34a" roughness={0.9} />
                </mesh>
            </group>
        </group>
    );
};

const Design = () => {
    const [filterType, setFilterType] = useState('All');
    const [filterFloor, setFilterFloor] = useState('All');
    const [selectedDesign, setSelectedDesign] = useState(null);

    const houses = [
        { id: 1, name: "The Oasis", type: "Villa", floors: 2, area: 3500, price: "₹1.4 Cr", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800" },
        { id: 2, name: "The Horizon", type: "3BHK", floors: 1, area: 1800, price: "₹72 L", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" },
        { id: 3, name: "The Zen", type: "2BHK", floors: 1, area: 1200, price: "₹48 L", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800" },
        { id: 4, name: "Skyline Manor", type: "Villa", floors: 3, area: 4500, price: "₹2.1 Cr", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800" },
        { id: 5, name: "Compact Nest", type: "1BHK", floors: 1, area: 750, price: "₹30 L", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
        { id: 6, name: "Urban Duplex", type: "3BHK", floors: 2, area: 2400, price: "₹96 L", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800" },
    ];

    const types = ["All", "1BHK", "2BHK", "3BHK", "Villa"];
    const floors = ["All", "1", "2", "3"];

    const filteredHouses = houses.filter(house => {
        if (filterType !== 'All' && house.type !== filterType) return false;
        if (filterFloor !== 'All' && house.floors.toString() !== filterFloor) return false;
        return true;
    });

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-4"
                    >
                        Design Gallery
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        Filter our premium architectural blueprints. Click any design to explore a 3D structural model.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 glass p-6 rounded-2xl sticky top-24 z-30">
                    <div className="flex items-center gap-2 text-brand-dark font-bold">
                        <Filter size={20} /> <span className="mr-4">Filters:</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500 font-medium">House Type</label>
                            <div className="flex gap-2 flex-wrap">
                                {types.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setFilterType(t)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === t ? 'bg-brand-accent text-brand-dark' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 md:ml-8">
                            <label className="text-sm text-gray-500 font-medium">Floors</label>
                            <div className="flex gap-2 flex-wrap">
                                {floors.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilterFloor(f)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterFloor === f ? 'bg-brand-accent text-brand-dark' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <AnimatePresence>
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHouses.map((house) => (
                            <motion.div
                                key={house.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedDesign(house)}
                                className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={house.image} alt={house.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-brand-dark px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                        {house.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-heading text-brand-dark mb-2">{house.name}</h3>
                                    <div className="flex justify-between items-center text-gray-600 mb-4 text-sm">
                                        <span>{house.floors} Floor{house.floors > 1 ? 's' : ''}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                        <span>{house.area} sq.ft</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                        <span className="font-bold text-green-600">Est. {house.price}</span>
                                    </div>
                                    <Button variant="outline" className="w-full text-sm py-2">View 3D Model</Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredHouses.length === 0 && (
                    <div className="text-center py-24">
                        <h3 className="text-2xl font-heading text-gray-400">No designs match your filters.</h3>
                        <button onClick={() => { setFilterType('All'); setFilterFloor('All') }} className="mt-4 text-brand-accent hover:underline">Clear Filters</button>
                    </div>
                )}

            </div>

            {/* 3D Viewer Modal */}
            <AnimatePresence>
                {selectedDesign && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/80 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedDesign(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-brand-dark">{selectedDesign.name} <span className="text-gray-400 font-sans font-normal text-lg ml-2">Interactive 3D Model</span></h2>
                                    <p className="text-gray-500 text-sm mt-1">Scroll to zoom, drag to rotate.</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDesign(null)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex-grow relative bg-gray-100 cursor-move">
                                <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-brand-dark font-bold animate-pulse text-xl">Loading 3D Engine...</div>}>
                                    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                                        <ambientLight intensity={0.5} />
                                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                                        <HouseModel house={selectedDesign} />
                                        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2} />
                                        <Environment preset="city" />
                                        <OrbitControls autoRotate autoRotateSpeed={0.5} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
                                    </Canvas>
                                </Suspense>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Design;
