import React, { Component } from 'react'
import Movie from './Movie'
import Searchbar from './Searchbar'

class Catalog extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
    }
  }
  handleSearchTerm = query => {
    this.setState({
      searchTerm: query,
    })
  }
  render() {
    const movies = this.props.movies
    const searchTerm = this.state.searchTerm.toLocaleLowerCase()
    const freeMovies = movies.filter(
      movie =>
        movie.isRented === false &&
        movie.title.toLocaleLowerCase().includes(searchTerm)
    )
    const rentedMovies = movies.filter(
      movie =>
        movie.isRented === true &&
        movie.title.toLocaleLowerCase().includes(searchTerm)
    )
    return (
      <div className='catalog-outer'>
        <Searchbar handleSearchTerm={this.handleSearchTerm} />
        {rentedMovies.length > 0 && (
          <div className='catalog-container'>
            <h2>Rented:</h2>
            <div className='catalog-rented'>
              {rentedMovies.map(movie => (
                <Movie
                  key={movie.id}
                  details={movie}
                  rentReturnMovie={this.props.rentReturnMovie}
                />
              ))}
            </div>
          </div>
        )}
        <div className='catalog-container'>
          <h2>Catalog:</h2>
          <div className='catalog-movies'>
            {freeMovies.map(movie => (
              <Movie
                key={movie.id}
                details={movie}
                rentReturnMovie={this.props.rentReturnMovie}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Catalog
