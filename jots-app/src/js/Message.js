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
import image from '../icons/lock.gif';

const Message = forwardRef((
    {contents:{timestamp, email, message, displayName, link, url1, url2, url3, label1, label2, label3, source1, source2, source3, img1, img2, img3}},
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
        
        {displayName === 'Recipe_Bot' &&
          <p id='txt__recipe'>
          {message} <br/><br/> {label1} from {source1} <br/><br/>
          <img className='recipe_img' src={img1} alt='Recipe_1_img'/><br/>
          <a href={url1}>{url1}</a><br/>
          <br/> {label2} from {source2}<br/><br/>
          <img className='recipe_img' src={img2} alt='Recipe_2_img'/><br/>
          <a href={url2}>{url2}</a><br/>
          <br/> {label3} from {source3}<br/><br/>
          <img className='recipe_img' src={img3} alt='Recipe_3_img'/><br/>
          <a href={url3}>{url3}</a><br/>
          </p>
        }

        {displayName === 'Username_Bot' && 
          <p id='txt__username'>
          {message}<br/><br/>
          <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
          </p>
        }

        {displayName === 'Password_Bot' &&  
          <p id='txt__password'>
          {message}
          <a href={link}>{link}</a><br/><br/>
          <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
          </p>
        }

        {displayName === user.displayName && 
          <p id='txt__default'>{message}</p>
        }

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