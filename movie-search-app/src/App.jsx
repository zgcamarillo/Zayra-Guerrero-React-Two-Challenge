import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleSearch() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  )

  const data = await response.json()
  setMovies(data.results)

  console.log(data.results);
}

  
  return (
    <div id="movie-page">
      <nav className="heading">
        <h1>Vid Space</h1>
          <div className="search-bar">
          <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </nav>
      

      
      <div className="results-grid">
        <h2>Results</h2>
        <ul className="results">
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p>{movie.title}</p>
             </li>
          ))}
        </ul>
        </div>
      </div>
  )
}

export default App
