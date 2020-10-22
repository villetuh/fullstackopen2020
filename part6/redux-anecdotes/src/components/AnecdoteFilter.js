import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const AnecdoteFilter = (props) => {
  const currentFilter = props.filter;

  const updateFilter = (event) => {
    const filterValue = event.target.value;

    props.setFilter(filterValue);
  };

  return (
    <div>
      <h2>filter</h2>
      <input onChange={updateFilter} type='text' value={currentFilter} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = {
  setFilter
};

const ConnectedAnecdoteFilter = connect(
  mapStateToProps,
  mapDispatchToProps)
  (AnecdoteFilter);

export default ConnectedAnecdoteFilter;
