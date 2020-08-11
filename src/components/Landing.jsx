import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      users: [
        {
          id: 1,
          name: 'Idan',
          color: 'Red',
        },
        {
          id: 2,
          name: 'Kundofon',
          color: 'Orange',
        },
        {
          id: 3,
          name: 'Galit',
          color: 'Blue',
        },
      ],
    }
  }
  render() {
    const { users } = this.state
    return (
      <div className='users-selection'>
        {users.map(user => (
          <Link key={user.id} to='/catalog'>
            <div className='user-box'>{user.name}</div>
          </Link>
        ))}
      </div>
    )
  }
}

export default Landing
