import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './App.css';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Login from './Login';
import Message from './Message';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user logged in 
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // user is loggged out
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      {user ? <Message /> : <Login />}
       
    </div>
  );
}

export default App;
