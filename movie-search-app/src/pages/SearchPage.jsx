import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleSearch() {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const q = query.trim();
    if (!q) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(q)}`
    );

    const data = await response.json();
    setMovies(data.results || []);
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
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={!query.trim()}>
            Search
          </button>
        </div>
      </nav>

      <div className="results-grid">
        <h2>Results</h2>

        <ul className="results">
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
