import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import uuid from 'react-uuid'
import './App.css'

const LOCAL_STORAGE_KEY = 'patsTodos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>      
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <input ref={todoNameRef} type="text" />
      <button id="add" onClick={addTodo}>Add Todo</button>
      <button id="clear" onClick={clearTodos}>Clear Completed</button>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
    </>
  )

}

export default App;
