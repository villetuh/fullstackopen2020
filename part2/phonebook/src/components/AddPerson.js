import React, {useState} from 'react';

const AddPerson = ({onPersonAdded}) => {
  const [ id, setId ] = useState(1);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newId = id + 1;
    setId(newId);

    onPersonAdded({ name: newName, id: newId, number: newNumber });
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPerson;