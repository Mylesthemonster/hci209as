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

                    let source1 = doc.data().source1
                    let source2 = doc.data().source2
                    let source3 = doc.data().source3

                    let label1 = doc.data().label1
                    let label2 = doc.data().label2
                    let label3 = doc.data().label3

                    let img1 = doc.data().img1
                    let img2 = doc.data().img2
                    let img3 = doc.data().img3


                    db.collection('chats').doc(chatId).collection('messages').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        message: 'Found good recipes including ' + q + '.\nTry these ones:',
                        url1: url1.replaceAll('"',''),
                        url2: url2.replaceAll('"',''),
                        url3: url3.replaceAll('"',''),
                        label1: label1.replaceAll('"',''),
                        label2: label2.replaceAll('"',''),
                        label3: label3.replaceAll('"',''),
                        source1: source1.replaceAll('"',''),
                        source2: source2.replaceAll('"',''),
                        source3: source3.replaceAll('"',''),
                        img1: img1.replaceAll('"',''),
                        img2: img2.replaceAll('"',''),
                        img3: img3.replaceAll('"',''),
                        uid: uuid(),
                        email: 'Recipe_Bot@gmail.com',
                        displayName: 'Recipe_Bot',
                      });
                } else {
                    console.log("No such document!");
                }
            })
            break;
    
            case input.includes('Username') || input.includes('username'):
                let tip1 = 'Your Username has been successfully stored.'
                let exc1 = false;
                if(!exc1){
                exc1 =true
                db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: tip1,
                uid: uuid(),
                email: 'Username_Bot@gmail.com',
                displayName: 'Username_Bot',
                });
                }
                
            break;

            case input.includes('Password') || input.includes('password') :
                let tip2 = 'Your Passowrd hads be securely stored. However, important senative data should be stored in a Password manager. Try out: '
                let link = 'https://passwords.google.com'
                let exc2 = false;
                if(!exc2){
                exc2 =true
                db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: tip2,
                link: link,
                uid: uuid(),
                email: 'Password_Bot@gmail.com',
                displayName: 'Password_Bot',
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
