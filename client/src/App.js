import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Seance from './pages/Seance';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <main>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/seance/:id" element={<Seance />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
