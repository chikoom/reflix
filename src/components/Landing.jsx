import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'

const Landing = props => {
  const [isAddUser, setIsAddUser] = useState(false)
  const [inputUsername, setInputUsername] = useState('')
  const [inputUsercolor, setInputUsercolor] = useState('#08D4B5')

  const renderAddUser = () => {
    setIsAddUser(true)
  }
  const handleUserInput = e => {
    const fieldValue = e.target.value
    setInputUsername(fieldValue)
  }
  const handleColorInput = e => {
    const fieldValue = e.target.value
    setInputUsercolor(fieldValue)
  }
  const handleAddUser = () => {
    props.saveNewUser(inputUsername, inputUsercolor)
    setIsAddUser(false)
  }
  const handleRemoveUser = e => {
    e.preventDefault()
    e.stopPropagation()
    props.deleteUser(e.target.getAttribute('data-userid'))
  }

  const { users } = props
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
              <button onClick={handleRemoveUser} className='button-delete-user'>
                <FontAwesomeIcon data-userid={user.id} icon={faUserSlash} />
              </button>
            </div>
          </Link>
        ))}
        <div className='addUser-box'>
          {(isAddUser && (
            <div className={`user-box`}>
              <input
                className='adduser-input'
                type='text'
                name='inputUsername'
                value={inputUsername}
                onChange={handleUserInput}
              />
              <button onClick={handleAddUser}>Add</button>
              <input
                type='color'
                name='inputUsercolor'
                onChange={handleColorInput}
                value={inputUsercolor}
              />
            </div>
          )) || (
            <div onClick={renderAddUser} className={`user-box`}>
              + Add User
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Landing
