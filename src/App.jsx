import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail"
import Search from "./Pages/Search";
import Favorites from "./Pages/Favorites";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        {/* Tambah Route Detail */}
        <Route path= "/movie/:id" element = {<MovieDetail />}/>
        <Route path = "/search" element = {<Search />} />
        <Route path="/favorites" element = {<Favorites />} />
      </Routes>
    </Router>
  )
}