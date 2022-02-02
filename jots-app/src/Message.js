import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Message.css'
import * as timeago from 'timeago.js';
import db from './firebase';
import { selectChatId } from './features/chatSlice';
import firebase from 'firebase';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Message = forwardRef((
    {contents:{timestamp, email, message}}, 
    ref
) => {
  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);

  const deleteMessage = () => {
    db.collection('chats').doc(chatId).collection('messages').doc('8XnHMCJjKuBzjx22nytM').delete();
  }

  const editMessage = () => {
    const newMessage = prompt('Please enter new note');

    db.collection('chats').doc(chatId).collection('messages').doc('1dmRT5VH60EeSanJGzLf').set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: newMessage,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    });
  }

  return (
    <div ref={ref} onClick={editMessage} className={`message ${user.email === email && 'message__sender'}`}>
        <IconButton>
            <HighlightOffIcon onClick={deleteMessage} className='message__delete_icon' />
        </IconButton>
        <p>{message}</p>
        <small>
            {timeago.format(new Date(timestamp?.toDate()).toLocaleString())}
            
        </small>
    </div>
  );
})

export default Message;