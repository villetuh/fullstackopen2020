import React, { useState, useEffect } from 'react';

import axios from 'axios';

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState();

  const api_key = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
  useEffect(() => {

    if (api_key === undefined) {
      console.log('Application needs to be configured correctly in order to display weather information');
      return;
    }

    let cancelTokenSource = axios.CancelToken.source();

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`, {
        cancelToken: cancelTokenSource.token
      })
      .then(response => {
        setWeatherData(response.data);
      });

      return () => {
        // Cancel get request here if not finished
        cancelTokenSource.cancel();
      };
  }, [country.capital, api_key]);

  return (
    <div>
      <h2>{country.name}</h2>
      <BasicInformation country={country} />
      <Languages languages={country.languages} />
      <br />
      <Flag country={country} />
      <br />
      {weatherData !== undefined ? <WeatherInfo city={country.capital} weatherData={weatherData} /> : ''}
    </div>
  );
};

const BasicInformation = ({ country }) => {
  return (
    <div>
      <h3>Information</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {languages.map(lan => <li key={lan.iso639_1}>{lan.name}</li>)}
      </ul>
    </div>
  );
};

const Flag = ({ country }) => {
  return (
    <div>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
    </div>
  );
}

const WeatherInfo = ({ city, weatherData }) => {
  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>Temperature: {Math.round(weatherData.main.temp - 273.0)} °C</div>
      <div>Weather: {weatherData.weather[0].main}</div>
      <div>Wind: {weatherData.wind.speed} m/s</div>
      <div>Dir: {weatherData.wind.deg}</div>
    </div>
  );
};

export default CountryInfo;