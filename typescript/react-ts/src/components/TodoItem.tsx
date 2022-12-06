import React from 'react';
import classes from './TodoItem.module.css'


const TodoItem: React.FC<{key:string, text: string, onClickToRemoveItem: () => void}> = (props) => {
    const removeFromListHandler = () => {
        console.log("clicked item: " + props.text);
        props.onClickToRemoveItem();
    }
    return <li className={classes.item} onClick={removeFromListHandler}>{props.text}</li>
}

export default TodoItem;