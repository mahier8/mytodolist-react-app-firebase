import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import db from "./firebase";
import firebase from "firebase";

function App() {
  // one state for creating an array of todos
  const [todos, setTodos] = useState([]);
  // one state for the input
  const [inputs, setInputs] = useState("");

  // When the app loads, we need to listen to the database
  // and fetch new todos as they get added/removed
  // we use the useEffect hook to run once, when the app
  // loads
  useEffect(() => {
    // this part of the code, fires when the app.js loads
    // also ordering the todo by timestamp and descending
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []); // if we add a variable here, it will run once
  // when the app.js loads and then whenver the variable
  // (dependancy) changes

  // onsnapshot = every time the databse changes, we want
  // to fire of some kindof event

  const addToDo = (event) => {
    // prevents the page from refreshing
    event.preventDefault();
    // this will fire off when we click the button
    // console.log("jello");
    // when we setTodods we want to first make sure we
    // keep everything that we already have in the array
    // and that constitutes the first part of the below
    // in the second part below, we just add in the input
    // from the useState hook above, meaning the latest
    // to do will be whatever we added in the input value
    // setTodos([...todos, inputs]); This is how we do it witout a db

    // how to add with firbase CRUD db
    db.collection("todos").add({
      todo: inputs,
      // each todo from the document will be whatever is
      // in inputs
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // how to add a timestamp with firebase
      //
    });
    // // will make the input empty/clear after adding a todo
    setInputs("");
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      {/* creating a form allows us to submit the form when 
      we press enter */}

      <form>
        {/* <input /> the input was removed as it is added
        using material ui below*/}
        <FormControl>
          <InputLabel>Write a to do</InputLabel>
          <Input
            type="text"
            value={inputs}
            onChange={(event) => setInputs(event.target.value)}
          />
        </FormControl>

        {/* changed into a material UI button <button type="submit" onClick={addToDo}>
          Add to do
        </button> */}
        {/* the button is disabled if there are no values 
        in the inputs */}
        <Button
          disabled={!inputs}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addToDo}
        >
          Add to do
        </Button>
      </form>
      <ul>
        {/* we map through the array of todays from the useState
      hook above then iterate through each individual to
      changing it into a Todo component item */}
        {/* {todos.map((todo) => (
          <Todo text={todo} />
        {/* ))}  how it was originally*/}
        {/* now when we pass in an object as a key */}
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
        {/* the props in the Todo component was called text 
          but we want the value to be the todo in the above*/}
      </ul>
    </div>
  );
}

export default App;
