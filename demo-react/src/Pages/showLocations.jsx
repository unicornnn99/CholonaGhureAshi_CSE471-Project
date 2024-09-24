import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ShowLocations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:8080/api/locations')
        .then((response) => {
          const destinationsData = response.data; 
          const destinationsArray = Object.values(destinationsData);

          setDestinations(destinationsArray);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto p-4 bg-emerald-50 p-4">
            <h1 className="text-3xl font-bold mb-4">Destinations</h1>
            {Array.isArray(destinations) && destinations.length > 0 ? (
                destinations.map(destination => (
                    <div key={destination._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-semibold">{destination.dest}</h2>
                        <p className="text-gray-700">{destination.info}</p>
                    </div>
                ))
            ) : (
                <p>No destinations found.</p>
            )}
        </div>
    );
};

export default ShowLocations;
