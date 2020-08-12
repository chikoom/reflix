import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      isAddUser: false,
      inputUsername: '',
      inputUsercolor: '#08D4B5',
    }
  }
  renderAddUser = () => {
    this.setState({
      isAddUser: true,
    })
  }
  handleInput = e => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    this.setState({
      [fieldName]: fieldValue,
    })
  }
  handleAddUser = () => {
    this.props.saveNewUser(this.state.inputUsername, this.state.inputUsercolor)
    this.setState({
      isAddUser: false,
    })
  }
  handleRemoveUser = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.target.getAttribute('data-userid'))
    this.props.deleteUser(e.target.getAttribute('data-userid'))
  }
  render() {
    const { users } = this.props
    return (
      <div className='landing-container'>
        <h2>Who is watching?</h2>
        <div className='users-selection'>
          {users.map(user => (
            <Link key={user.id} to={`/catalog/u/${user.id}`}>
              <div
                className={`user-box ${user.color}`}
                style={{ backgroundColor: user.color }}
              >
                {user.name.toUpperCase()}
                <button
                  onClick={this.handleRemoveUser}
                  className='button-delete-user'
                >
                  <FontAwesomeIcon data-userid={user.id} icon={faUserSlash} />
                </button>
              </div>
            </Link>
          ))}
          <div className='addUser-box'>
            {(this.state.isAddUser && (
              <div className={`user-box`}>
                <input
                  className='adduser-input'
                  type='text'
                  name='inputUsername'
                  value={this.state.inputUsername}
                  onChange={this.handleInput}
                />
                <button onClick={this.handleAddUser}>Add</button>
                <input
                  type='color'
                  name='inputUsercolor'
                  onChange={this.handleInput}
                  value={this.state.inputUsercolor}
                />
              </div>
            )) || (
              <div onClick={this.renderAddUser} className={`user-box`}>
                + Add User
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
