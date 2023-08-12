import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'e6b0702387a6d941e0f463d4a424d4b1';
  const [cityName, setCityName] = useState('Colombo'); 

  const fetchWeatherData = () => {
    if (cityName) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); 

  return (
    <div className='container'>
      <div className='weather'>
        <div className="search">
          <input
            type='text'
            placeholder='Enter City Name'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={fetchWeatherData}>
            <img className="search-icon" src="/images/search.png" alt='Search' />
          </button>
        </div>
        {weatherData && (
          <div className='weatherInfo'>
                            <img src='/images/cloud.svg' alt="" />

            <h1>{Math.round(weatherData.main.temp)}°C</h1>
            <h2>{weatherData.name}</h2>
            <div className='details'>
              <div className="column">
                <img src='/images/cloud.svg' alt="" />
                <div className='humidity'>
                  <p>{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="column">
                <img src='/images/cloud.svg' alt="" />
                <div className='wind'>
                  <p>{weatherData.wind.speed} Km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
