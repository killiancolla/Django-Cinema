import "./style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Seance from "./pages/Seance";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/seance/:id" element={<Seance />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
