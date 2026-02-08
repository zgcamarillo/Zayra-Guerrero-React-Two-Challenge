import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import starImg from "./assets/star.png"
import './App.css'

function TodoDetail({ todos, deleteTodo, updateTodo }) {
  const {id } = useParams();
  const todo = todos.find((t) => String(t.id) === id);
  const navigate = useNavigate();
  const [editText, setEditText] = useState(todo ? todo.text : "");

  if (!todo) return <p>To Do not found</p>

  return (
    <>
    <h2>To Do Detail</h2>
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />
    <button
      onClick={() => {updateTodo(todo.id, editText); navigate("/"); }}
      disabled={!editText.trim()}
    >
      Save
    </button>
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

    setTodos([...todos, { id: Date.now(), text: newTodo, done: false}])
    setNewTodo("")
  }

  function deleteTodo(id) {
  setTodos(todos.filter((todo) => todo.id !== id))
}

  function updateTodo(id, newText) {
    setTodos(todos.map(t => (t.id === id ? {...t, text: newText } : t)))
  }

  return (
    <div id="list-container">
      <div className="title">
        <img src={starImg} alt="Star"/>
        <h1>TO DO LIST</h1>
        <img src={starImg} alt="Star"/>
      </div>

      <Routes>

      <Route
        path="/"
        element={
          <>
        
            <div className="todo-card">
              <ul className="todo-list">
                {todos.map((todo) => (
                  <li className={`todo-item ${todo.done ? "done" : ""}`} key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                    />

                    <Link className="todo-text" to={`/todo/${todo.id}`}>
                      {todo.text}
                    </Link>
                  </li>
                ))}
              </ul>


              {todos.length === 0 && (
                <p className="empty-state">Add a task to get started ✨</p>
              )}
            </div>

            <div className="add-container">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New To Do"
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <button onClick={addTodo}>Add</button>
            </div>
          </>
        }
      />



        <Route path="/todo/:id" element={<TodoDetail todos={todos} 
        deleteTodo={deleteTodo} 
        updateTodo={updateTodo}
        />} />
      </Routes>
    </div>
  )
}

export default App;
