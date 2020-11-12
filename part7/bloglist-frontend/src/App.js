import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import LoginControl from './components/LoginControl';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import User from './components/User';
import Users from './components/Users';

import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { clearCurrentUser, initializeUsers, setCurrentUser } from './reducers/userReducer';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const loggedInUserStorageKey = 'loggedInBloglistUser';

  const addBlogFromRef = useRef();

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.user);

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem(loggedInUserStorageKey);
    if (storedUserJSON === null) {
      return;
    }

    const user = JSON.parse(storedUserJSON);
    const userId = JSON.parse(atob(user.token.split('.')[1])).id;
    dispatch(setCurrentUser(userId, user));

    blogService.setToken(user.token);
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const loginUser = async (username, password) => {
    let success = false;
    try {
      const user = await loginService.login({ username, password });
      const userId = JSON.parse(atob(user.token.split('.')[1])).id;
      dispatch(setCurrentUser(userId, user));

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
    dispatch(clearCurrentUser());

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

      <LoginControl user={currentUser} loginUser={loginUser} logoutUser={handleLogout} />
      <br />
      { currentUser !== null &&
        <Toggleable buttonLabel='add new blog' ref={addBlogFromRef}>
          <h3>add new blog</h3>
          <AddBlog onBlogAdded={handleAddNewBlog} />
        </Toggleable>
      }
      <br />
      <BrowserRouter>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <h3>blogs</h3>
            <Blogs
              addLikeHandler={handleAddLike}
              deleteBlogHandler={handleDeleteBlog}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
