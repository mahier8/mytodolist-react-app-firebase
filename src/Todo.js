import {
  Button,
  // Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import "./todo.css";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import db from "./firebase";

// The styles for the modal is added outside of the function
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "theme.palette.background.paper",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, // this is how you style material UI
}));

function Todo(props) {
  const classes = useStyles(); // needed to style the modal
  const [open, setOpen] = useState(false); // open/close modal
  const [inputs, setInputs] = useState("");
  // we have to capture the edited change to our todo

  const handleOpen = (event) => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const updateTodo = () => {
    // here we update the todo with new input text

    // we use .set() to update things in firestore and we
    // have to include an option (second parameter), which
    // is {merge: true}. This prevents you from overwriting
    // what was already in the input
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: inputs, //whatever is in the input, the inputs(hook).
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {/* this is what will be shown when the button for the 
      Modal is clicked (below). styling also for the modal below.*/}
        <div className={classes.paper}>
          <h1>I am a modal</h1>
          {/* the input below takes the value of what we type and
           stores it in the inputs (useState hook), also takes
           every key stroke and adds it into setInputs (useState hook) */}
          <input
            placeholder={props.todo.todo}
            value={inputs}
            onChange={(event) => setInputs(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo-list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          {/* <ListItemText primary={props.text} secondary="Dummy deadline :alarm" /> */}
          {/* this is how we add in the key to avoid the error */}
          <ListItemText
            primary={props.todo.todo} // 1st todo=object 2nd todo=text
            secondary="Dummy deadline :alarm"
          />
          {/* props. can be called anything you want
          <li>{props.text}</li> */}
        </ListItem>
        <button onClick={handleOpen}>Edit me</button>
        {/* <Button></Button>  the below delete button used 
        to be button with DELETE ME */}
        <DeleteForeverIcon
          onClick={(event) => {
            // how to delete with button
            db.collection("todos").doc(props.todo.id).delete();
          }}
        >
          DELETE ME
        </DeleteForeverIcon>
      </List>
    </>
  );
}

export default Todo;

// This second option is how it was originally
// (without material UI). I could style my own list.
// function Todo(props) {
//   return (
//     <div>
//         {/* props. can be called anything you want*/}
//       <li>{props.text}</li>
//     </div>
//   );
// }

// export default Todo;
