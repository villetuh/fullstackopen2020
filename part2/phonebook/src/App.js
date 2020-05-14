import React, { useState, useEffect } from 'react';

import AddPerson from './components/AddPerson';
import Persons from './components/Persons'; 
import FilterField from './components/FilterField';

import personService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAddNewPerson = (person) => {
    const personsWithSameName = persons.filter((p) => p.name === person.name);
    let replaceExistingNumber = false;
    
    if (personsWithSameName.length > 0) {
      if (!window.confirm(`${person.name} already exists in the phone book. Replace existing number with new one?`)) {
        return;
      }
      person = { ...person, id: personsWithSameName[0].id };
      replaceExistingNumber = true;
    }

    if (replaceExistingNumber) {
      personService
        .update(person)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
        })
    }
    else {
      personService
        .create(person)
        .then(person => {
          setPersons(persons.concat(person));
        });
    }
  };

  const handleDeletePerson = (person) => {

    // Confirm from user that delete was on purpose
    const message = `Delete ${person.name}?`;
    if (!window.confirm(message)) {
      return;
    }

    personService
      .remove(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
      });
  };

  return (
    <div>
      <h2>Phone book</h2>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new Person</h2>
      <AddPerson onPersonAdded={handleAddNewPerson} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;