import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

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

const Container = styled.div`
  padding: 1em 4em;
  background: white;
`;

const Page = styled.div`
  padding: 1em 1em;
  background: white;
  color: hsl(180, 50%, 25%);
  font-family: 'Roboto', sans-serif;
`;

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

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
    <Container>
      <BrowserRouter>
        <Header />
        <br />
        <Notification />
        <Page>
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
              { currentUser !== null &&
              <Toggleable buttonLabel='Add new blog' ref={addBlogFromRef}>
                <SmallerTitle>Add new blog</SmallerTitle>
                <AddBlog onBlogAdded={handleAddNewBlog} />
              </Toggleable>
              }
              <Blogs />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </Page>
      </BrowserRouter>
    </Container>
  );
};

export default App;
