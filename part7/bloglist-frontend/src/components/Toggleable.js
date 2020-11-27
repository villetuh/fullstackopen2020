import React, { useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: ${props => props.primary ? 'teal' : 'white'};
  color: ${props => props.primary ? 'white' : 'teal'};
  margin: 2px;
  padding: 6px 12px;
  font-size: medium;
  border-style: solid;
  border-color: teal;
  border-radius: 4px;
  border-width: 1px;
`;

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button primary={true} onClick={toggleVisibility}>{ props.buttonLabel }</Button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
