import { Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage.jsx"
import MovieDetailPage from "./pages/MovieDetailPage.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  )
}
