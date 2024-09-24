import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:8080/api/showtrip')
        .then((response) => {
          const data = response.data; 
          const array = Object.values(data);

          setTrips(array);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto p-4 bg-emerald-50 p-4">
            <h1 className="text-3xl font-bold mb-4">Your Trips</h1>
            {Array.isArray(trips) && trips.length > 0 ? (
                trips.map(trips => (
                    <div key={trips._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold">{trips.customerName}</h2>
                        <p className="text-gray-700 font-bold">Destination: {trips.Location}</p>
                        <p className="text-gray-700">Hotel: {trips.Hotel}</p>
                        <p className="text-gray-700">Check-in Date: {trips.from}</p>
                        <p className="text-gray-700">Check-out Date: {trips.to}</p>
                        <p className="text-gray-700">Total Cost: {trips.cost}</p>
                    </div>
                ))
            ) : (
                <p>No trips found.</p>
            )}
        </div>
    );
};

export default ShowTrips;
