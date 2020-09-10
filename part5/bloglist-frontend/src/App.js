import React, { useState, useEffect } from 'react';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Logout from './components/Logout';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const loggedInUserStorageKey = 'loggedInBloglistUser';

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem(loggedInUserStorageKey);
    if (storedUserJSON === null) {
      return;
    }

    const user = JSON.parse(storedUserJSON);
    setUser(user);
    blogService.setToken(user.token);
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (exception) {
        console.log('Error occurred while fetching blogs.');
      }
    }
    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);

      window.localStorage.setItem(loggedInUserStorageKey, JSON.stringify(user));
    } catch (exception) {
      console.log('Wrong credentials');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserStorageKey);
    setUser(null);
    blogService.setToken('');
  };

  const handleAddNewBlog = async (blog) => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
  };

  if (user === null) {
    return(
      <Login
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    );
  }
  else {
    return (
      <div>
        <h2>blog list</h2>
        <Logout name={user.name} handleLogout={handleLogout} />
        <br />
        <h3>add new blog</h3>
        <AddBlog onBlogAdded={handleAddNewBlog} />
        <br />
        <h3>blogs</h3>
        <Blogs blogs={blogs} />
      </div>
    );
  }
};

export default App;
