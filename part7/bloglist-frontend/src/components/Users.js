import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

const UsersTable = styled.table`
  table-layout: fixed;
  width: 400px;
`;

const UserRow = styled.tr`
  height: 40px;
`;

const BlogsColumn = styled.td`
  text-align: center;
`;

const StyledLink = styled(Link)`
  padding: 1em;
  background: 'white';
  text-decoration: none;
  color: teal;
`;

const Users = () => {
  const users = useSelector(state => state.users.users);

  return (
    <div>
      <SmallerTitle>Users</SmallerTitle>
      <UsersTable>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user =>
              <UserRow key={user.id}>
                <td><StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink></td>
                <BlogsColumn>{user.blogs.length}</BlogsColumn>
              </UserRow>)
          }
        </tbody>
      </UsersTable>
    </div>
  );
};

export default Users;
