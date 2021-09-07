import React, { useState } from "react";
import "./App.css";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

function App() {
  // one state for creating an array of todos
  const [todos, setTodos] = useState([
    "walk dogs",
    "clean rubbish",
    "go for run",
  ]);
  // one state for the input
  const [inputs, setInputs] = useState("");

  const addToDo = (event) => {
    // prevents the page from refreshing
    event.preventDefault();
    // this will fire off whn we click the button
    console.log("jello");
    // when we setTodods we want to first make sure we
    // keep everything that we already have in the array
    // and that constitutes the first part of the below
    // in the second part below, we just add in the input
    // from the useState hook above, meaning the latest
    // to do will be whatever we added in the input value
    setTodos([...todos, inputs]);
    // will make the input empty/clear after adding a todo
    setInputs("");
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      {/* creating a form allows us to submit the form when 
      we press enter */}
      <form action="">
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
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
