import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import axios from 'axios';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const apiKey = 'af76e95d96c9e6e8786e8773fb1a2c01';
  const OpenCageapiKey = '320af50162584e92a3db63d134a702c3';

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleGetWeather = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OpenCageapiKey}`);
      const firstResult = response.data.results[0];

      if (firstResult) {
        const { lat, lng } = firstResult.geometry;
        setCoordinates({ latitude: lat, longitude: lng });
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`);
        setWeatherData(weatherResponse.data);
      } else {
        setCoordinates(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCoordinates(null);
    }
  };

  const getWeatherIcon = () => {
    if (!weatherData) return '';

    const temperature = weatherData.main.temp - 273.15;

    if (temperature < 10) {
      return '❄️'; // Cold weather
    } else if (temperature > 25) {
      return '☀️'; // Hot weather
    } else {
      return '⛅'; // Moderate weather
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center">Weather App</MDBCardTitle>
              <MDBInput
                label="Enter City"
                value={city}
                onChange={handleCityChange}
              />
              <MDBBtn color="primary" onClick={handleGetWeather} style={{display:"block",width:"100%",marginTop:"10px"}}>
                Get Weather
              </MDBBtn>

              {weatherData && (
                <div className="mt-4">
                  <MDBCardText>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} &#8451; {getWeatherIcon()}</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                  </MDBCardText>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
