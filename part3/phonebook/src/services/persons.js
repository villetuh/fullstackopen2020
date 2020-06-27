import axios from 'axios';

const baseUrl = 'https://phonebook-vvt.herokuapp.com/api/persons';

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then(response => response.data).catch(error => Promise.reject(error));;
};

const create = newPerson => {
  const response = axios.post(baseUrl, newPerson);
  return response.then(response => response.data).catch(error => Promise.reject(error));
};

const remove = person => {
  const response = axios.delete(`${baseUrl}/${person.id}`);
  return response.then(response => response.data).catch(error => Promise.reject(error));;
};

const update = person => {
  const response = axios.put(`${baseUrl}/${person.id}`, person);
  return response.then(response => response.data).catch(error => Promise.reject(error));
}

export default { getAll, create, remove, update };