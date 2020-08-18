import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Route, Link } from 'react-router-dom'

class Movie extends Component {
  handleRentReturn = e => {
    e.stopPropagation()
    e.preventDefault()
    const { id } = this.props.details
    this.props.rentReturnMovie(
      this.props.currentUserId,
      id,
      !this.props.isRented
    )
  }
  render() {
    const { id, title, img, isRented } = this.props.details
    const buttonIcon = this.props.isRented ? faMinusCircle : faPlusCircle
    return (
      <Link to={`/movies/${id}`}>
        <div
          data-id={id}
          className='movie-container'
          style={{ backgroundImage: `url(${img})` }}
          onClick={this.handleMovieClick}
        >
          <div className='movie-container-title'>{title}</div>
          {this.props.userId !== 0 && (
            <button className='movie-button' onClick={this.handleRentReturn}>
              <FontAwesomeIcon icon={buttonIcon} />
            </button>
          )}
        </div>
      </Link>
    )
  }
}

export default Movie
