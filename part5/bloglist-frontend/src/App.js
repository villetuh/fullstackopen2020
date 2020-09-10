import React, { useState, useEffect } from 'react';
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
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      setUsername('');
      setPassword('');

      window.localStorage.setItem(loggedInUserStorageKey, JSON.stringify(user));
    } catch (exception) {
      console.log('Wrong credentials');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserStorageKey);
    setUser(null);
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
        <h2>blogs</h2>
        <Logout name={user.name} handleLogout={handleLogout} />
        <Blogs blogs={blogs} />
      </div>
    );
  }
};

export default App;
