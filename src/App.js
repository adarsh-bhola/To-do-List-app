import React,{ useState,useEffect } from 'react';
import { Button,FormControl,Input,InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo.js';
import db from './firebase.js';
import firebase from 'firebase';

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  //When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here....fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();   //will stop the REFRESHing of the page

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos,input]);
    setInput('');    //clear up input after pressing addTodo button
  }
  return (
    <div className="App">
      <h1>To-do List app!!!</h1>
      <form>

        <FormControl>
          <InputLabel>Write a Todo action</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;