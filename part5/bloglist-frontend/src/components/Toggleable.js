import React, { useState, useImperativeHandle } from 'react';

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

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
});

export default Toggleable;
