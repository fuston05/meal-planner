import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={`https://${process.env.REACT_APP_DOMAIN}/oauth2/default`}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin + '/login/callback'}
      onAuthRequired={onAuthRequired}
      pkce={true} >
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn issuer={`${process.env.REACT_APP_DOMAIN}/oauth2/default`} />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;