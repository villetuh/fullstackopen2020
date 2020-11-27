import React from 'react';
import styled from 'styled-components';

import LoginControl from './LoginControl';
import Navigation from './Navigation';

const Container = styled.div`
  background: white;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: light-grey;
  font-family: 'PT Sans', sans-serif;
  color: teal;
  height: 46px;
`;

const NavigationContainer = styled.span`
  float: left;
  line-height: 38px;
`;

const LoginContainer = styled.span`
  float: right;
  line-height: 38px;
`;

const Header = () => {
  return (
    <Container>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <LoginContainer>
        <LoginControl />
      </LoginContainer>
    </Container>
  );
};

export default Header;
