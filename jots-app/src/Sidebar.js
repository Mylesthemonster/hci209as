import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import firebase from 'firebase';


function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection('chats').onSnapshot(snapShot => {
            setChats(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const addChat = () => {

        const chatName = prompt('Please enter Note title');
        
        if (chatName) {
            db.collection('chats').add({
                chatName: chatName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
    }

  return <div className='sidebar'>
      <div className='sidebar__header'>
          <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar' />
          <div class="sidebar__input">
              <SearchIcon />
              <input placeholder='Search' />
          </div>

          <IconButton className='sidebar__inputButton'>
              <AddIcon onClick={addChat}/>
          </IconButton>
      </div>

      <div className='sidebar__chat'>
        {chats.map(({ id, data: { chatName }}) => (
            <SidebarChat key={id} id={id} chatName={chatName}/>  
        ))}
      </div>
  </div>;
}

export default Sidebar;
