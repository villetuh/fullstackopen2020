import axios from 'axios';
const baseUrl = '/api/blogs';

let authorizationHeader = null;

const create = async (id, comments)  => {
  const config = {
    headers: { Authorization: authorizationHeader }
  };

  const response = await axios.post(`${baseUrl}/${id}/comments`, comments, config);
  return response.data;
};

const setToken = token => {
  authorizationHeader = `bearer ${token}`;
};

export default { create, setToken };
