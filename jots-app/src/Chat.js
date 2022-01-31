import React, { useState } from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GestureIcon from '@material-ui/icons/Gesture';
import { Icon, IconButton } from '@material-ui/core';

function Chat() {

    const [input,setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();

        //Firebase stuff
        setInput('');
    };

  return <div className='chat'>
      <div className='chat__header'>
          <h4>
              Title: <span className='chat__name'>Note title</span>
            </h4>
          <strong>Details</strong>
      </div>

      <div className='chat__messages'>
          <h2>I am a Note</h2>
          <h2>I am a Note</h2>
          <h2>I am a Note</h2>
          <h2>I am a Note</h2>
          <h2>I am a Note</h2>
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
