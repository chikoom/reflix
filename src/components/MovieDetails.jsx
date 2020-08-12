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
      <iframe
        className='iframe-container'
        title={movieDetails.title}
        width='560'
        height='315'
        src={`https://www.youtube.com/embed/${movieDetails.trailer}`}
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
    </div>
  )
}

export default MovieDetails
