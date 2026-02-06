import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import './App.css'

function TodoDetail({ todos, deleteTodo }) {
  const {id } = useParams()
  const todo = todos.find((t) => String(t.id) === id)
  const navigate = useNavigate()

  if (!todo) return <p>To Do not found</p>

  return (
    <>
    <h2>To Do Detail</h2>
    <p>{todo.text}</p>
    <button 
      onClick={() => {
      deleteTodo(todo.id) 
      navigate("/")}} >
      Delete
      </button>
    <Link to="/">Back</Link>
    </>  
  )
}


function App() {

  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] =useState("")

  function addTodo() {
    if(!newTodo.trim()) return 

    setTodos([...todos, { id: Date.now(), text: newTodo}])
    setNewTodo("")
  }

  function deleteTodo(id) {
  setTodos(todos.filter((todo) => todo.id !== id))
}

  return (
    <>
      <h1>To Do</h1>

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New To Do"
              />

              <button onClick={addTodo}>Add To Do</button>

              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <Link to={`/todo/${todo.id}`}>{todo.text}</Link>
                  </li>
                ))}
              </ul>

            </>
          } 
        />

        <Route path="/todo/:id" element={<TodoDetail todos={todos} deleteTodo={deleteTodo} />} />
      </Routes>
    </>
  )
}

export default App
