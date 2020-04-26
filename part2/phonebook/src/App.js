import React, { useState } from 'react';

import AddPerson from './components/AddPerson';
import Person from './components/Person'; 

const App = () => {
  const [ id, setId ] = useState(4);

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1, number: '040-123456' },
    { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
    { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
  ]);

  const handleAddNewPerson = (person) => {
    const personsWithSameName = persons.filter((p) => p.name === person.name);
    if (personsWithSameName.length > 0) {
      window.alert(`${person.name} already exists in the phone book.`);
      return;
    }

    const newId = id + 1;
    person.id = newId;
    setId(newId);

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