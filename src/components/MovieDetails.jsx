import React from 'react'

const MovieDetails = props => {
  const movieId = parseInt(props.match.params.id)
  const movieDetails = props.movies.find(movie => movie.id === movieId)
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
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default MovieDetails
