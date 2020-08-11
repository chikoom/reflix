import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Movie extends Component {
  handleRentReturn = e => {
    e.stopPropagation()
    e.preventDefault()
    const { id, isRented } = this.props.details
    this.props.rentReturnMovie(id, !isRented)
  }
  handleMovieClick = () => {
    console.log('movie')
  }
  render() {
    const { id, title, img, isRented } = this.props.details
    const buttonIcon = isRented ? faMinusCircle : faPlusCircle
    return (
      <Link to={`/movies/${id}`}>
        <div
          data-id={id}
          className='movie-container'
          style={{ backgroundImage: `url(${img})` }}
          onClick={this.handleMovieClick}
        >
          <div className='movie-container-title'>{title}</div>
          <button onClick={this.handleRentReturn}>
            <FontAwesomeIcon icon={buttonIcon} />
          </button>
        </div>
      </Link>
    )
  }
}

export default Movie
