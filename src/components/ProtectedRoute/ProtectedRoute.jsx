import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  useEffect(() => {
    openRegistrationModal();
  }, []);
  const openRegistrationModal = () => {
    if (!props.loggedIn) {
      props.handleOpenAuthModal();
    }
  };
  return (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/" />)}
    </Route>
  );
};

export default ProtectedRoute;
