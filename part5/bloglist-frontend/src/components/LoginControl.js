import React from 'react';

import Login from './Login';
import Logout from './Logout';
import Toggleable from './Toggleable';

const LoginControl = ({ user, loginUser, logoutUser }) => {

  return (
    <div>
      { user === null
        ? <Toggleable buttonLabel='Login'>
            <Login loginUser={loginUser} />
          </Toggleable>
        : <Logout name={user.name} handleLogout={logoutUser} />
      }
    </div>
  );
}

export default LoginControl;
