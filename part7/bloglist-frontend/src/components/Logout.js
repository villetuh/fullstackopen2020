import React from 'react';
import styled from 'styled-components';

const UserDisplay = styled.span`
  font-size: small;
`;

const LogoutButton = styled.button`
  background: white;
  color: teal;
  margin: 0px 5px 0px 10px;
  padding: 6px 12px;
  font-size: medium;
  border-style: solid;
  border-color: teal;
  border-radius: 4px;
  border-width: 1px;
`;

const Logout = ({ name, handleLogout }) => (
  <UserDisplay>
    User: {name}
    <LogoutButton onClick={handleLogout}>
      Logout
    </LogoutButton>
  </UserDisplay>
);

export default Logout;
