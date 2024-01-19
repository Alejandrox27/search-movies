const RenderMovies = ({movies}) => {
    return (
        <ul className="movies">
          {
            movies.map(movie => (
              <li key={movie.id} className="movie">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={`Poster of the movie ${movie.title}`} />
              </li>
            ))
          }
        </ul>
      )
};

export default RenderMovies;