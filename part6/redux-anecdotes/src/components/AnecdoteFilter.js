import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const AnecdoteFilter = (props) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.filter);

  const updateFilter = (event) => {
    const filterValue = event.target.value;

    dispatch(setFilter(filterValue));
  };

  return (
    <div>
      <h2>filter</h2>
      <input onChange={updateFilter} type='text' value={currentFilter} />
    </div>
  );
};

export default AnecdoteFilter;
