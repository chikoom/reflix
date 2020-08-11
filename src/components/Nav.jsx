import React from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/catalog'>Catalog</Link>
      <div className='logo-container'>REFLIX</div>
    </nav>
  )
}

export default Nav
