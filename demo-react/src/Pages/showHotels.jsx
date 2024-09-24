import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ShowHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch]= useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:8080/api/hotels')
        .then((response) => {
          const hotelData = response.data; 
          const array = Object.values(hotelData);

          setHotels(array);
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
            <h1 className="text-3xl font-bold mb-4">Hotels</h1>
            <Form>
              <InputGroup className='my-3'>
              <Form.Control 
                onChange={(e)=> setSearch(e.target.value)} 
                placeholder='Filter by city' 
              />
              </InputGroup>
            </Form>
            {Array.isArray(hotels) && hotels.length > 0 ? (
                hotels
                .filter((hotel) =>{
                  return search.toLowerCase()===''
                    ? hotel
                    : hotel.location.toLowerCase().includes(search);
                })
                .map(hotel => (
                    <div key={hotel._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold">{hotel.hotel_name}</h2>
                        <p className="text-gray-700 font-bold">{hotel.location}</p>
                        <p className="text-gray-700">{hotel.address}</p>
                        <p className="text-gray-700">Rating: {hotel.Rating}</p>
                        <p className="text-gray-700">Price per Night: {hotel.roomRate}</p>
                        <button className="bg-emerald-800 border rounded-lg p-4 shadow-lg text-white my-3"><NavLink to ={`/bookHotel/${hotel.hotel_id}`}>Book Now</NavLink></button>
                    </div>
                ))
            ) : (
                <p>No hotels found.</p>
            )}
        </div>
    );
};

export default ShowHotels;
