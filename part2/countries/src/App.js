import React, { useState, useEffect } from 'react';

import axios from 'axios';

import CountryInfo from './components/CountryInfo';
import CountryList from './components/CountryList';
import FilterField from './components/FilterField';

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const selectCountry = (country) => {
    setFilter(country.name);
  }

  const filteredCountries = getCountriesBasedOnFilter(countries, filter);

  let infoMessage;
  let countryDisplay;
  if (filter.length === 0) {
    infoMessage = 'Find country by typing to the search box.';
  }
  else if (filteredCountries.length > 10) {
    infoMessage = 'Too many matches. Use more specific filter.';
  }
  else if (filteredCountries.length === 1) {
    countryDisplay = <CountryInfo country={filteredCountries[0]} />;
  }
  else {
    countryDisplay = <CountryList countries={filteredCountries} selectCountry={selectCountry} />;
  }

  return (
    <div>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />
      
      {infoMessage !== undefined ? infoMessage : countryDisplay}
    </div>
  );
};

function getCountriesBasedOnFilter(countries, filter) {
  let filteredCountries = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()));
  
  /* Determined if filter is exact match and if so use that as only result */
  var indexOfExactMatch = filteredCountries.map(country => country.name.toUpperCase()).indexOf(filter.toUpperCase());
  if (indexOfExactMatch > 0) {
    filteredCountries = [ filteredCountries[indexOfExactMatch] ];
  };

  return filteredCountries;
}

export default App;