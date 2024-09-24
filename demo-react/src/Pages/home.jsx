import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div 
        className="min-h-screen flex flex-col"
        >
        
            <header className="bg-emerald-800 p-4">
                <h1 className="text-white text-3xl font-bold text-center">Cholona Ghure Ashi</h1>
            </header>
            <main className="flex-grow p-6">
                <p className="text-emerald-950 text-lg font-bold leading-relaxed mb-30">
                    Welcome to Cholona Ghure Ashi, your ultimate gateway to unforgettable adventures! Whether you're dreaming of sun-soaked beaches, 
                    vibrant cityscapes, or serene mountain retreats, we're here to help you discover hidden gems and popular destinations alike. 
                    Join us as we embark on a journey to explore new cultures, savor delicious cuisines, and create memories that will last a lifetime. 
                    Let's turn your travel dreams into reality!
                </p>
                
                <div className="flex justify-center m-10">
                    <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4">
                        <NavLink to="/locations" style={{ textDecoration: 'none', color: 'inherit' }}>View Destinations</NavLink>
                    </button>

                    <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4">
                        <NavLink to="/hotels" style={{ textDecoration: 'none', color: 'inherit' }}>View Hotels</NavLink>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;
