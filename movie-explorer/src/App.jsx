import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import './App.css'

function App() {
  return (
	<Router>
		<Navbar />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/movie/:id' element={<MovieDetail/>} />
		</Routes>	
	</Router>
  )
}

export default App;
