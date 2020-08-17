import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='nav-container'>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/catalog/u/0'>Catalog</Link>
      </nav>
      <div className='logo-container'>REFLIX</div>
    </div>
  )
}

export default Nav
