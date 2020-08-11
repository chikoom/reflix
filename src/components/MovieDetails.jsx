import React from 'react'

const MovieDetails = (match, movies) => {
  const movieId = parseInt(match.params.id)
  const movieDetails = movies.find(movie => movie.id === movieId)
  return (
    <div className='single-movie-container'>
      <h1>
        {movieDetails.title} ({movieDetails.year})
      </h1>
      <img src={movieDetails.img} alt={movieDetails.title} />
      <p>{movieDetails.descrShort}</p>
    </div>
  )
}

export default MovieDetails
