import React, { useState, useEffect } from 'react';

import AddPerson from './components/AddPerson';
import Persons from './components/Persons'; 
import FilterField from './components/FilterField';
import Notification from './components/Notification';

import personService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState({ type: '', text: '' });

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
          showTimedNotification('info', `Number updated for ${updatedPerson.name}.`)
        })
        .catch(error => {
          if (error.response !== undefined && error.response.status === 404) {
            showTimedNotification('error', `${person.name} was no longer found from phone book.`);
          } else if (error.response !== undefined && error.response.status === 400) {
            showTimedNotification('error', `Error occurred while upating number for ${person.name}. ${error.response.data.error}`);
          } else {
            showTimedNotification('error', `Error occurred while upating number for ${person.name}.`);
          }
        });
    }
    else {
      personService
        .create(person)
        .then(person => {
          setPersons(persons.concat(person));
          showTimedNotification('info', `${person.name} added to phone book.`)
        })
        .catch(error => {
          showTimedNotification('error', `Error occurred while adding ${person.name} to phone book. ${error.response.data.error}`);
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
        showTimedNotification('info', `${person.name} removed from phone book.`);
      })
      .catch(error => {
        if (error.response !== undefined && error.response.status === 404) {
          showTimedNotification('error', `${person.name} was no longer found from phone book.`);
        }
        else {
          showTimedNotification('error', `Error occurred while deleting ${person.name}.`);
        }
      });
  };

  const showTimedNotification = (type, text, time = 5000) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, time);
  };

  return (
    <div>
      <h2>Phone book</h2>
      <Notification notification={notification} />
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new Person</h2>
      <AddPerson onPersonAdded={handleAddNewPerson} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;