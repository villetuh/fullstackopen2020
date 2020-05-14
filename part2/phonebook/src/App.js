import React, { useState, useEffect } from 'react';

import axios from 'axios';

import AddPerson from './components/AddPerson';
import Persons from './components/Persons'; 
import FilterField from './components/FilterField';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAddNewPerson = (person) => {
    const personsWithSameName = persons.filter((p) => p.name === person.name);
    if (personsWithSameName.length > 0) {
      window.alert(`${person.name} already exists in the phone book.`);
      return;
    }

    axios
      .post('http://localhost:3001/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data));
      });
  };

  return (
    <div>
      <h2>Phone book</h2>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new Person</h2>
      <AddPerson onPersonAdded={handleAddNewPerson} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;