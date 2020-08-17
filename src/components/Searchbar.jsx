import React, { useState } from 'react'

const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInput = e => {
    const inputValue = e.target.value
    setSearchQuery(inputValue)
    props.handleSearchTerm(searchQuery)
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        name='search-input'
        className='search-input'
        placeholder='Search a movie...'
        onChange={handleInput}
        value={searchQuery}
      />
    </div>
  )
}

export default Searchbar
