import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const UserRoute = ({ component: Component, ...rest }) => {


  const token= localStorage.getItem('user-auth-token');
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Redirect to='/' {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default UserRoute