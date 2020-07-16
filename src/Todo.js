import React,{ useState } from 'react';
import './Todo.css';
import { List,ListItem,ListItemText,ListItemAvatar,Button,Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes=useStyles();
    const [open, setOpen]= useState(false);
    const [input, setInput]= useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo:input
        },{ merge:true });
        setOpen(false);
    }
    
    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Update Window</h1>
                <input value={input} onChange={event => setInput(event.target.value)} />
                <Button variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Deadline!" />
            </ListItem>
            <Button variant="contained" color="secondary" onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo