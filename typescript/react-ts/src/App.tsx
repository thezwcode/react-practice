import React, {useState} from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo'

function App() {
  const [todos, setToDos] = useState<Todo[]>([]);
  const addToDoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setToDos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });

  }

  const removeItemFromListHandler = (id: string) => {
      setToDos((prevTodos) => {
        return prevTodos.filter((todoItem) => {return todoItem.id !== id})
      })
    }
  


  return (
    <div>
      <NewTodo onAddToDo={addToDoHandler} />
      <Todos items={todos} onRemoveItemFromList={removeItemFromListHandler}/>
    </div>
  );
}

export default App;
