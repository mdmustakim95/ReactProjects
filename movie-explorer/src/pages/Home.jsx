import {useState, useEffect, useRef} from 'react';
import MovieList from '../components/MovieList';

function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const searchInputRef = useRef();
	const fetchMovies = async (query) => {
		setLoading(true);
		const res = await fetch(`http://www.omdbapi.com/?apikey=6b607fb8&s=${query}`);
		const data = await res.json();
		// console.log(data);
		setMovies(data.Search || []	);
		setLoading(false);
	} 
	useEffect(() => {
		fetchMovies("Avengers");
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		const query = searchInputRef.current.value;
		if(query.trim() !== ""){
			fetchMovies(query);
		}
	}
    return(
    	<div className="home">
		<form onSubmit={handleSearch}>
			<input ref={searchInputRef} className="searchInput" placeholder="Search for a movie..." />
			<button type="submit">Search 🔎</button>
		</form>
		{loading ? <p>Loading...</p> : <MovieList movies={movies} />}
	</div>	

    )
}
export default Home;