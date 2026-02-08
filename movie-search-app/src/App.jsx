import { Routes, Route, Navigate } from "react-router-dom"
import SearchPage from "./pages/SearchPage.jsx"
import MovieDetailPage from "./pages/MovieDetailPage.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
