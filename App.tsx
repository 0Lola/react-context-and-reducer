import * as React from 'react';
import { setAuth, useAuthContext } from './context/AuthContext';
import './style.css';

export default function App() {
  const [authContext, authDispatch] = useAuthContext();

  const handleAuth = (e) => {
    setAuth(authDispatch, 'auth', e.target.value);
    setAuth(authDispatch, 'isSignIn', true);
  };

  return (
    <div>
      <h1>AuthContext</h1>
      <p>Is Sign In :{authContext.isSignIn + ''}</p>
      <p>Auth: {authContext.auth}</p>
      <input onChange={handleAuth}></input>
    </div>
  );
}
