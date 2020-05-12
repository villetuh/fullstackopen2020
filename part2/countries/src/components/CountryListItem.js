import React from 'react';

const CountryListItem = ({ country, selectCountry }) => {
  return (
    <>
      <div>
        {country.name}
        <button onClick={() => selectCountry(country)}>Select</button>
      </div>
    </>
  );
};

export default CountryListItem;