import React from 'react';

import CountryListItem from './CountryListItem';

const CountryList = ({ countries }) => {
  return (
    <div>
      {
        countries.map(country => <CountryListItem country={country} key={country.alpha3Code} />)
      }
    </div>
  );
};

export default CountryList;