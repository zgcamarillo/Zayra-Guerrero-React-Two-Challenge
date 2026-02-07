import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <div className="cloud">
        <div className="puffs">
          
        </div>
      </div>
      <h1>Countly</h1>
      <div className="card">
        <h3>{count}</h3>
          <div className="btn-row">
            <button id="increase" onClick={() => setCount((count) => count + 1)}>
              Increase
            </button>  
            <button id="decrease" onClick={() => setCount((count) => count -1)}>
              Decrease
            </button>
          </div>
      </div>
    </div>
  )
}

export default App
