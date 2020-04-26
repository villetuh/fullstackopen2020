import React, { useState } from 'react';

import AddPerson from './components/AddPerson';
import Person from './components/Person'; 

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]);

  const handleAddNewPerson = (person) => {
    setPersons(persons.concat(person));
  };

  return (
    <div>
      <h2>Phonebook</h2>
        <AddPerson onPersonAdded={handleAddNewPerson} />
      <h2>Numbers</h2>
        <div>
          { persons.map(person => <Person person={person} key={person.id} />) }
        </div>
    </div>
  );
};

export default App;