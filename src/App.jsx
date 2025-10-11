import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail"
import Favorites from "./Pages/Favorites";
import { Toaster } from "react-hot-toast";

export default function App() {

  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{duration: 1500}} />
      <Navbar
        searchMode = {searchMode}
        setSearchMode = {setSearchMode}
        setSearchQuery = {setSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element = {
            <Home 
              searchMode = {searchMode}
              searchQuery = {searchQuery}
              setSearchMode = {setSearchMode}
              setSearchQuery = {setSearchQuery}
            />
          }
        />
        <Route path="/movie/:id" element = {<MovieDetail />} />
        <Route path="/favorites" element = {<Favorites />} />
      </Routes>
    </Router>
  )
}