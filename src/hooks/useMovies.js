import { useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies ({ search }){
    const [responseMovies, setResponseMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef("");

    const getMovies = async() => {
      try{
        if (previousSearch.current === search){
          return;
        }
        lastMovie.current = search;
        setLoading(true);
        const movieData = await searchMovies({search});
        if(movieData.lastMovie) return;
        setResponseMovies(movieData.mappedMovies);
      }catch(error){
        setError("Error during the movies get")
      }finally{
        setLoading(false);
      }
    }
  
    return {movies: responseMovies, getMovies, loading, error};
  };

export default useMovies;