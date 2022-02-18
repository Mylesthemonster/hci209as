import React, { forwardRef} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import '../css/Message.css'
import * as timeago from 'timeago.js';
import db from './firebase';
import { selectChatId } from '../features/chatSlice';
import firebase from 'firebase';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

const Message = forwardRef((
    {contents:{timestamp, email, message}},
    ref
) => {
  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);

  const deleteMessage = () => {

    let text = document.getElementById("txt");
    let innerText = text.innerHTML;
    console.log(innerText)
    console.log(text)

    db.collection('chats').doc(chatId).collection('messages')
    .where('message', '==', innerText)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            db.collection('chats').doc(chatId).collection('messages').doc(doc.id).delete()
            });
        });
  }

  const editMessage = () => {

    const newMessage = prompt('Please enter new note');

    if (newMessage === null){
      return
    }

    let input = document.getElementById("txt");
    let show = input.innerHTML;
    console.log(show)

    db.collection('chats').doc(chatId).collection('messages')
    .where('message', '==', show)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);

              db.collection('chats').doc(chatId).collection('messages').doc(doc.id).set({
                timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
                message: newMessage,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
        });
    })
  }

  return (
    <div ref={ref} className={`message ${user.email === email && 'message__sender'}`}>
        <IconButton onClick={deleteMessage} className='message__delete_icon' size='small' >
          <HighlightOffIcon fontSize='small'/>
        </IconButton>
        <p id='txt'>{message}</p>
        <small>
            {timeago.format(new Date(timestamp?.toDate()).toLocaleString())}
            <IconButton onClick={editMessage} className='message__edit_icon' size='small' >
              <EditIcon fontSize='small'/>
            </IconButton>
        </small>
    </div>
  );
})

export default Message;