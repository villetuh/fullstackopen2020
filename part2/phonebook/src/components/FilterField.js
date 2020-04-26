import React from 'react';

const FilterField = ({filter, handleFilterChange}) => {
  return (
    <div>
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default FilterField;