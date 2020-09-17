import React, { useState, useEffect } from 'react';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import LoginControl from './components/LoginControl';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const loggedInUserStorageKey = 'loggedInBloglistUser';

  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({ type: '', text: '' });

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

  const loginUser = async (username, password) => {
    let success = false;
    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      blogService.setToken(user.token);

      window.localStorage.setItem(loggedInUserStorageKey, JSON.stringify(user));

      success = true;
    } catch (exception) {
      showTimedNotification('error', 'wrong username or password');
      console.log('Wrong credentials');
    }

    return success;
  }

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserStorageKey);
    setUser(null);
    blogService.setToken('');
    showTimedNotification('info', 'successfully logged out');
  };

  const handleAddNewBlog = async (blog) => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
    showTimedNotification('info', 'New blog added.');
  };

  const showTimedNotification = (type, text, time = 5000) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, time);
  };

  return (
    <div>
      <h2>blog list</h2>
      <Notification notification={notification} />

      <LoginControl user={user} loginUser={loginUser} logoutUser={handleLogout} />
      <br />
      { user !== null &&
        <div>
          <h3>add new blog</h3>
          <AddBlog onBlogAdded={handleAddNewBlog} />
        </div>
      }
      <br />
      <h3>blogs</h3>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
