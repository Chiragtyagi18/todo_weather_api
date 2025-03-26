import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '5403aea2105085304e4f7c0227d3325d'; 
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    if (!location) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: location,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded">
       <div className=' flex justify-between items-center pr-80'>
      <p className='text-white font-extrabold'>Weather Check: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <form onSubmit={handleSearch}>
        <input className='text-white border-amber-50'
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city"
        />
        <button  className='text-white border-2 border-white-600' type="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Weather&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
      </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className='text-white'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weatherData.main.temp}°C</p>
          <p>Weather:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {weatherData.weather[0].description}</p>
          <p>Humidity:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
