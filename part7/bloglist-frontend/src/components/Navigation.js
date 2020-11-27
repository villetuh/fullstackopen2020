import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin-bottom: 2px;
`;

const StyledLink = styled(Link)`
  padding: 1em;
  background: 'white';
  border-style: ${props => props.selected ? 'solid' : 'none'};
  border-width: ${props => props.selected ? '0px 0px 4px 0px' : '0px'};
  text-decoration: none;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  color: teal;
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <Container>
      <LinkContainer>
        <StyledLink to='/blogs' selected={location.pathname.startsWith('/blogs') || location.pathname === '/'}>Blogs</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <StyledLink to='/users' selected={location.pathname.startsWith('/users')}>Users</StyledLink>
      </LinkContainer>
    </Container>
  );
};

export default Navigation;
