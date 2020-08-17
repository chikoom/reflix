import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Movie = props => {
  const handleRentReturn = e => {
    e.stopPropagation()
    e.preventDefault()
    const { id } = props.details
    props.rentReturnMovie(props.currentUserId, id, !props.isRented)
  }

  const { id, title, img } = props.details
  const buttonIcon = props.isRented ? faMinusCircle : faPlusCircle
  return (
    <Link to={`/movies/${id}`}>
      <div
        data-id={id}
        className='movie-container'
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='movie-container-title'>{title}</div>
        {props.userId !== 0 && (
          <button className='movie-button' onClick={handleRentReturn}>
            <FontAwesomeIcon icon={buttonIcon} />
          </button>
        )}
      </div>
    </Link>
  )
}

export default Movie
