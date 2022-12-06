import {useRef} from 'react'
import classes from './NewTodo.module.css'

const NewTodo: React.FC<{onAddToDo: (text: string) => void}> = (props) => {
    const todoTextRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = todoTextRef.current!.value;

        if(enteredText.trim().length === 0) {
            return;
        }

        props.onAddToDo(enteredText);
    }

    return <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor='text'>Todo text</label>
        <input type='text' id='text' ref={todoTextRef}/>
        <button>Add Todo</button>
    </form>
};

export default NewTodo;