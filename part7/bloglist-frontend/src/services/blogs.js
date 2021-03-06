import axios from 'axios';
const baseUrl = '/api/blogs';

let authorizationHeader = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newBlog  => {
  const config = {
    headers: { Authorization: authorizationHeader }
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: authorizationHeader }
  };

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: { Authorization: authorizationHeader }
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const setToken = token => {
  authorizationHeader = `bearer ${token}`;
};

export default { getAll, create, update, remove, setToken };
