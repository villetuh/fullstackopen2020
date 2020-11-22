import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import Header from './components/Header';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import User from './components/User';
import Users from './components/Users';

import { createBlog, initializeBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeUsers } from './reducers/userReducer';

const App = () => {

  const addBlogFromRef = useRef();

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleAddNewBlog = async (blog) => {
    addBlogFromRef.current.toggleVisibility();
    dispatch(createBlog(blog));
    dispatch(setNotification({ type: 'info', text: 'New blog added.' }));
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <br />
        <Notification />
        <h2>blog list</h2>

        <br />
        { currentUser !== null &&
          <Toggleable buttonLabel='add new blog' ref={addBlogFromRef}>
            <h3>add new blog</h3>
            <AddBlog onBlogAdded={handleAddNewBlog} />
          </Toggleable>
        }
        <br />
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
