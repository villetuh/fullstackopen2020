import React, { useState, useEffect, useRef } from 'react';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import LoginControl from './components/LoginControl';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const loggedInUserStorageKey = 'loggedInBloglistUser';

  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({ type: '', text: '' });

  const addBlogFromRef = useRef();

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
    addBlogFromRef.current.toggleVisibility();
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
    showTimedNotification('info', 'New blog added.');
  };

  const handleAddLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    const newBlog = await blogService.update(updatedBlog);

    setBlogs(blogs.filter(b => b.id !== blog.id).concat(newBlog));
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
        <Toggleable buttonLabel='add new blog' ref={addBlogFromRef}>
          <h3>add new blog</h3>
          <AddBlog onBlogAdded={handleAddNewBlog} />
        </Toggleable>
      }
      <br />
      <h3>blogs</h3>
      <Blogs blogs={blogs} addLikeHandler={handleAddLike} />
    </div>
  );
};

export default App;
