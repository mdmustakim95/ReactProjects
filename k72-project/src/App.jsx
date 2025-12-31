import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Agence from './pages/Agence.jsx';
import Projects from './pages/Projects.jsx';
// import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agence" element={<Agence />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App
