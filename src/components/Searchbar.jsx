import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
    }
  }
  handleInput = e => {
    const inputValue = e.target.value
    this.setState(
      {
        searchQuery: inputValue,
      },
      () => {
        this.props.handleSearchTerm(this.state.searchQuery)
      }
    )
  }
  render() {
    return (
      <div className='search-container'>
        <input
          type='text'
          name='search-input'
          className='search-input'
          placeholder='Search a movie...'
          onChange={this.handleInput}
          value={this.state.searchQuery}
        />
      </div>
    )
  }
}

export default Searchbar
