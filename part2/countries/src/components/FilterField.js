import React from 'react';

const FilterField = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label>Select country:
        <input value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default FilterField;