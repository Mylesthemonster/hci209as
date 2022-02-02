import React, { useEffect, useState } from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GestureIcon from '@material-ui/icons/Gesture';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Chat() {
    const user = useSelector(selectUser);
    const [input,setInput] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages,setMessages] = useState([]);

    useEffect(() =>{
        if(chatId) {
            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
        }
    }, [chatId])
    
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        });

        setInput('');
    };

  return <div className='chat'>
      <div className='chat__header'>
          <h4>
              Title: <span className='chat__name'>{chatName}</span>
            </h4>
          <strong>Details</strong>
      </div>

      <div className='chat__messages'>
          <FlipMove>
            {messages.map(({id, data}) => (
                <Message key={id} contents={data} />
            ))}
          </FlipMove>
      </div>


      <div className='chat__input'>
          <form>
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder='Type Note' 
                type='text'
                />
              <button onClick={sendMessage}>Post Note</button>
          </form>
          <IconButton>
              <MicIcon className='chat__mic' />
          </IconButton>
          <IconButton>
              <GestureIcon className='chat__gesture' />
          </IconButton>
          <IconButton>
              <AttachFileIcon className='chat__attach' />
          </IconButton>
      </div>
  </div>;
}

export default Chat;
