import React, {useState} from 'react';
import axios from 'axios';
import {  NavLink, useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [customerName, setName]= useState('');
  const [Location, setLocation]= useState('');
  const [Hotel, setHotel]= useState('');
  const [from, setFrom]= useState('');
  const [to, setTo]= useState('');
  const [loading, setLoading]  = useState(false);
  const navigate= useNavigate();

  const handleSaveTrip =() =>{
    const data= {
      customerName, Location, Hotel, from, to
    };
    setLoading(true);
    axios
      .post('http://localhost:8080/api/trips',data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((err)=>{
        setLoading(false);
        console.log(err);
      })
  }

  return (
    <div className="container mx-auto p-4 bg-emerald-50 p-4">
      <h1 className='text-3xl font-bold mb-4'>Book Your Trip</h1>
      <div className="border rounded-lg p-4 shadow-lg">
        <div className='my-4'>
          <label className='text-xl mr-4 text-teal-800'>Customer Name</label>
          <input className='my-3'
            type='text'
            value={customerName}
            onChange={(e)=> setName(e.target.value)} 
            placeholder='Your Name' />
        </div>  
        <div className='my-4'>
          <label className='text-xl mr-4 text-teal-800'>Destination</label>
          <input className='my-3'
            type='text'
            value={Location}
            onChange={(e)=> setLocation(e.target.value)} 
            placeholder='Destination' />
        </div>  
        <div className='my-4'>
          <label className='text-xl mr-4 text-teal-800'>Hotel Name</label>
          <input className='my-3'
            type='text'
            value={Hotel}
            onChange={(e)=> setHotel(e.target.value)} 
            placeholder='Hotel Name' />
        </div>  
        <div className='my-4'>
          <label className='text-xl mr-4 text-teal-800'>Start Date</label>
          <input className='my-3'
            type='datetime-local'
            value={from}
            onChange={(e)=> setFrom(e.target.value)} 
            />
        </div>  
        <div className='my-4'>
          <label className='text-xl mr-4 text-teal-800'>End Date</label>
          <input className='my-3'
            type='datetime-local'
            value={to}
            onChange={(e)=> setTo(e.target.value)} 
            />
        </div>  
        <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4" onClick={handleSaveTrip} disabled={loading}>
          {loading ? 'Booking...':"Confirm Trip"}
        </button>    
      </div>
    </div>
  )
}

export default CreateTrip