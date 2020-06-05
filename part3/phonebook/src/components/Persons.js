import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, onDelete }) => {
  return (
    <div>
      {
        persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
          .map(person => <Person person={person} key={person.id} onDelete={onDelete} />)
      }
    </div>
  );
};

export default Persons;