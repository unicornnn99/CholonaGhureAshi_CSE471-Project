import React, { useState } from 'react';
import axios from 'axios';

const BookHotel = ({ hotelId }) => {
    const [customerName, setCustomerName] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            await axios.post(`http://localhost:8080/api/bookHotel/${hotelId}`, {
                customerName,
                from,
                to,
            });
            setLoading(false);
            
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-emerald-50 p-4">
            <h1 className='text-3xl font-bold mb-4'>Book Your Trip</h1>
            <div className="border rounded-lg p-4 shadow-lg">
            <form>
                <div>
                    <label className='text-xl mr-4 text-teal-800'>
                        Name:
                        <input className='my-3'
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className='text-xl mr-4 text-teal-800'>
                        Check-in Date:
                        <input className='my-3'
                            type="datetime-local"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className='text-xl mr-4 text-teal-800'>
                        Check-out Date:
                        <input className='my-3'
                            type="datetime-local"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Booking...':"Confirm Trip"}
                </button>
            </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default BookHotel;
