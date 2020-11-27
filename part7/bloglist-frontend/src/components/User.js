import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

const User = () => {
  const userId = useParams().id;
  const user = useSelector(state => state.users.users.find(user => user.id === userId));

  if (!user) {
    return null;
  }

  return (
    <div>
      <SmallerTitle>{user.name}</SmallerTitle>
      <SmallerTitle>Added blogs</SmallerTitle>
      <ul>
        {
          user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </div>
  );
};

export default User;
