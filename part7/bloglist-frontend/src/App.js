import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import LoginControl from './components/LoginControl';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const loggedInUserStorageKey = 'loggedInBloglistUser';

  const [user, setUser] = useState(null);

  const [currentUserId, setCurrentUserId] = useState('');

  const addBlogFromRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem(loggedInUserStorageKey);
    if (storedUserJSON === null) {
      return;
    }

    const user = JSON.parse(storedUserJSON);
    setUser(user);

    const userId = JSON.parse(atob(user.token.split('.')[1])).id;
    setCurrentUserId(userId);

    blogService.setToken(user.token);
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const loginUser = async (username, password) => {
    let success = false;
    try {
      const user = await loginService.login({ username, password });

      setUser(user);

      const userId = JSON.parse(atob(user.token.split('.')[1])).id;
      setCurrentUserId(userId);

      blogService.setToken(user.token);

      window.localStorage.setItem(loggedInUserStorageKey, JSON.stringify(user));

      success = true;
    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'wrong username or password' }));
      console.log('Wrong credentials');
    }

    return success;
  };

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserStorageKey);
    setUser(null);
    setCurrentUserId('');
    blogService.setToken('');
    dispatch(setNotification({ type: 'info', text: 'successfully logged out' }));
  };

  const handleAddNewBlog = async (blog) => {
    addBlogFromRef.current.toggleVisibility();
    dispatch(createBlog(blog));
    dispatch(setNotification({ type: 'info', text: 'New blog added.' }));
  };

  const handleAddLike = async (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDeleteBlog = async (blog) => {
    const result = window.confirm('Do you want to delete the blog?');
    if (result === false) {
      return;
    }

    dispatch(deleteBlog(blog));
  };

  return (
    <div>
      <h2>blog list</h2>
      <Notification />

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
      <Blogs
        currentUser={currentUserId}
        addLikeHandler={handleAddLike}
        deleteBlogHandler={handleDeleteBlog}
      />
    </div>
  );
};

export default App;
