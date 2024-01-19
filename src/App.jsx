import { useState, useEffect, useRef } from 'react'
import RenderMovies from './components/Movies'
import useMovies from './hooks/useMovies'
import './App.css'
import { CircularProgress } from '@mui/material';

function useSearch(){
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === '';
      return
    }

    if (search.length < 3){
      setError("The movie must be greater than 3")
      return
    }
    
    if(search === ''){
      setError("Add a movie in the input")
      return
    } 
    
    if (search.match(/^\d+$/)){
      setError("The movie can't have a number")
      return
    }


    setError(null);
  }, [search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false);
  const {search, updateSearch, error} = useSearch();
  const {movies, getMovies, loading, error: fetchError} = useMovies({ search, sort })
  const hasMovies = movies?.length > 0

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search});
  };

  const handleSort = () => {
    setSort(!sort);
  }

  const handleChange = (e) => {
    updateSearch(e.target.value);
  }

  return (
    <>
    <div className='page'>
      <header>
        <h1>Movie search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
          style={{ 
            border: "1px solid transparent", 
            borderColor: error ? 'red' : "transparent" }}
          type="text"
          value={search} 
          placeholder='Avengers, Star wars, The matrix...' 
          autoComplete='off' 
          onChange={handleChange}
          name='movieTitle' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit' disabled={error && true}>Search</button>
        </form>
        {
          loading && <CircularProgress color="inherit" style={{marginTop: 20}} />
        }
        {
          error && <p>{error}</p>
        }
      </header>

      <main>
        {
          hasMovies ? <RenderMovies movies={movies} /> : (
            <p>No movie found</p>
          )
        }
      </main>
    </div>
    </>
  )
}

export default App
