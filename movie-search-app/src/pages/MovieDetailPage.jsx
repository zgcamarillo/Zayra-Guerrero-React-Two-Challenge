import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={{ padding: 20, color: "white" }}>
      <Link to="/" style={{ color: "white" }}>← Back</Link>

      <h1>{movie.title}</h1>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <p><strong>Release:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
}
