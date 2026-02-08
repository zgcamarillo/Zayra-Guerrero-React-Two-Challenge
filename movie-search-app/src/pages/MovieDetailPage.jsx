import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="detail-loading">Loading...</p>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="detail-page">
      <div className="detail-top">
        <Link className="back-link" to="/">← Back</Link>
      </div>

      <div className="detail-card">
        <div className="poster-wrap">
          {poster ? (
            <img className="detail-poster" src={poster} alt={movie.title} />
          ) : (
            <div className="poster-fallback">No Poster</div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>

          <div className="detail-meta">
            <span>📅 {movie.release_date || "Unknown"}</span>
            <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            <span>🕒 {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
          </div>

          {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

          <h3 className="section-title">Overview</h3>
          <p className="overview">{movie.overview || "No overview available."}</p>

          {movie.genres?.length > 0 && (
            <>
              <h3 className="section-title">Genres</h3>
              <div className="genre-row">
                {movie.genres.map((g) => (
                  <span className="genre-chip" key={g.id}>{g.name}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
