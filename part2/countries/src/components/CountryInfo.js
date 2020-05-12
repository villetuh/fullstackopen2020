import React from 'react';

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <h3>Information</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lan => <li key={lan.iso639_1}>{lan.name}</li>)}
      </ul>
      <br />
      <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
    </div>
  );
};

export default CountryInfo;