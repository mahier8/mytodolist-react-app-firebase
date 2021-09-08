import {
  // Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import "./todo.css";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import db from "./firebase";

function Todo(props) {
  return (
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
