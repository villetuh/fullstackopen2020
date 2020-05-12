import React, { useState, useEffect } from 'react';

import axios from 'axios';

import CountryList from './components/CountryList';

function App() {
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  );
};

export default App;