export const searchMovies = async({ search }) => {
    if (search === '') return null

    if (search.length < 3) return null
      
      if(search === '') return null
      
      if (search.match(/^\d+$/)) return null
        try{
            if(search){
                const response = await fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
                const data = await response.json();
                
                const movies = data.Search
  
                const mappedMovies = movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
                }));

                return {mappedMovies}
           }
        }catch(error){
            console.log(error);
        }
    //setResponseMovies(withResult);
    
}