import React from 'react';

import CountryListItem from './CountryListItem';

const CountryList = ({ countries, selectCountry }) => {
  return (
    <div>
      {
        countries.map(country => <CountryListItem country={country} key={country.alpha3Code} selectCountry={selectCountry} />)
      }
    </div>
  );
};

export default CountryList;