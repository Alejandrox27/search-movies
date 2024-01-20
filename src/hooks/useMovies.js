import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies ({ search, sort }){
    const [responseMovies, setResponseMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef("");

    const getMovies = useCallback(
      async({search}) => {
      try{
        if (previousSearch.current === search){
          return;
        }
        previousSearch.current = search;
        setLoading(true);
        const movieData = await searchMovies({search});
        if(movieData.lastMovie) return;
        setResponseMovies(movieData.mappedMovies);
      }catch(error){
        setError("Error during the movies get")
      }finally{
        setLoading(false);
      }
    }, [])

    const sortedMovies = useMemo(() => {
      return sort && responseMovies
    ? [...responseMovies].sort((a,b) => a.title.localeCompare(b.title))
    : responseMovies
}, [sort, responseMovies])

    return {movies: sortedMovies, getMovies, loading, error};
  };

export default useMovies;