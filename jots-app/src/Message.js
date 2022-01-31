import React from 'react';
import Chat from './Chat';
import './Message.css';
import Sidebar from './Sidebar';
;


function Message() {
  return (<div className='message'>
      <Sidebar />
      <Chat />
  </div>);
}

export default Message;
