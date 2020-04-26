import React from 'react';
import Person from './Person';

const Persons = ({persons, filter}) => {
  return(
    <div>
    { 
      persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
            .map(person => <Person person={person} key={person.id} />) 
    }
    </div>
  );
};

export default Persons;