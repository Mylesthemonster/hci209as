import React, { useEffect, useState } from 'react';
import '../css/Chat.css';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../features/chatSlice';
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';
import uuid from 'react-uuid';
import RecipeFetch from './RecipeFetch';

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

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }
    
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }).then(docRef => {
            console.log("Document written with ID: ", docRef.id);
        });

        switch(true){
            case input.includes('Recipe')|| input.includes('recipe'):
            let q = input.substring(input.indexOf(': ') + 2);

            RecipeFetch(q)

            sleep(2000);

            db.collection("recipes").doc(q).get().then((doc) => {
                if (doc.exists) {
                    let url1 = doc.data().url1
                    let url2 = doc.data().url2
                    let url3 = doc.data().url3
                    db.collection('chats').doc(chatId).collection('messages').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        message: 'Found a good recipe including ' + q + '.\nTry these ones:\n' + url1.replaceAll('"','') + '\n' + url2.replaceAll('"','') + '\n' + url3.replaceAll('"','') + '\n',
                        uid: uuid(),
                        email: 'Bot@gmail.com',
                        displayName: 'Bot',
                      });
                } else {
                    console.log("No such document!");
                }
            })
            break;
    
            case input.includes('Username') || input.includes('Password') || input.includes('username') || input.includes('password') :
                let tip = 'Senative Data should be stored in a secure Password manager. Try out https://passwords.google.com'
                let exc = false;
                if(!exc){
                exc =true
                db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: tip,
                uid: uuid(),
                email: 'Bot@gmail.com',
                displayName: 'Bot',
                });
                }
                
                break;
            
            default:
                break;
        }

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
      </div>
  </div>;
}

export default Chat;
