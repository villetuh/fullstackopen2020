import React, {useState} from 'react';

const AddPerson = ({onPersonAdded}) => {
  const [ id, setId ] = useState(1);
  const [ newName, setNewName ] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newId = id + 1;
    setId(newId);

    onPersonAdded({ name: newName, id: newId });
    setNewName('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPerson;