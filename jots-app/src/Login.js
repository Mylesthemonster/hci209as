import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css'
import image from './jots_icon.png'
import { auth, provider } from './firebase';
import { signInWithRedirect } from 'firebase/auth';

function Login() {
    const signIn = () => {
        signInWithRedirect(auth, provider);
    }
  return <div className='login'>
      <div className='login__logo'>
          <img src={image} alt='Jots icon' />
          <h1>Jots</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
  </div>;
}

export default Login;
