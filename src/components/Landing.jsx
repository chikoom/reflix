import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'

class Landing extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { users } = this.props
    return (
      <div className='landing-container'>
        <h2>Who is watching?</h2>
        <div className='users-selection'>
          {users.map(user => (
            <Link key={user.id} to={`/catalog/u/${user.id}`}>
              <div className={`user-box ${user.color}`}>
                {user.name.toUpperCase()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default Landing
