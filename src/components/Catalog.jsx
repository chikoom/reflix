import React, { useState } from 'react'
import Movie from './Movie'
import Searchbar from './Searchbar'

const Catalog = props => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTerm = query => {
    setSearchTerm(query.toLocaleLowerCase())
  }

  const users = props.users
  const userId = props.match ? parseInt(props.match.params.id) : null
  const currentUser = users.find(user => user.id === userId)
  const currentUserMovies = currentUser ? currentUser.rentedMovies : []

  const movies = props.movies
  const freeMovies = movies.filter(
    movie =>
      movie.title.toLocaleLowerCase().includes(searchTerm) &&
      !currentUserMovies.includes(movie.id)
  )
  const rentedMovies = movies.filter(
    movie =>
      movie.title.toLocaleLowerCase().includes(searchTerm) &&
      currentUserMovies.includes(movie.id)
  )
  const budget = currentUser.budget
  return (
    <div className='catalog-outer'>
      <div className='catalog-control'>
        <Searchbar handleSearchTerm={handleSearchTerm} />
        {userId !== 0 && (
          <div className='budget-container'>Your budget: ${budget}</div>
        )}
      </div>
      <div className='catalog-movies'>
        {rentedMovies.length > 0 && (
          <div className='catalog-container'>
            <h2>Rented:</h2>
            <div className='catalog-rented  catalog-list'>
              {rentedMovies.map(movie => (
                <Movie
                  key={movie.id}
                  details={movie}
                  rentReturnMovie={props.rentReturnMovie}
                  currentUserId={userId}
                  isRented={true}
                />
              ))}
            </div>
          </div>
        )}
        <div className='catalog-container'>
          <h2>Catalog:</h2>
          <div className='catalog-movies catalog-list'>
            {freeMovies.map(movie => (
              <Movie
                key={movie.id}
                details={movie}
                rentReturnMovie={props.rentReturnMovie}
                currentUserId={userId}
                isRented={false}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog
