import React, { useState } from 'react';

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={{display: visible ? 'none' : ''}}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
}

export default Toggleable;
