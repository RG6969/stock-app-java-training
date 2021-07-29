import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const AdminRoute = ({ component: Component, ...rest }) => {


  const token= localStorage.getItem('admin-auth-token');
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

export default AdminRoute