import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetails from './components/MovieDetails'
import Nav from './components/Nav'
import moviesData from './data/movies'
import axios from 'axios'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([
    {
      id: 0,
      name: 'default',
      color: 'gray',
      rentedMovies: [],
      budget: 10,
    },
  ])
  const [loggedUser, setLoggedUser] = useState('default')
  const [budget, setBudget] = useState(10)
  const [movies, setMovies] = useState(moviesData)

  useEffect(() => {
    const storageUsers = getUsersFromStorage()
    setUsers([...users, ...storageUsers])

    const getMoivesFromAPI = async () => {
      const results = await axios.get(
        'http://api.themoviedb.org/3/discover/movie?api_key=36d6fb6f9b72120b5262096f86219df7&sort_by=popularity.desc'
      )
      //console.log(results)
      const refactoredResults = results.data.results.map(result => ({
        id: result.id,
        isRented: false,
        title: result.title,
        img: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${result.poster_path}`,
        year: result.release_date.substring(
          0,
          result.release_date.indexOf('-')
        ),
        descrShort: result.overview,
        trailer: '',
      }))
      console.log()
      setMovies([...movies, ...refactoredResults])
    }

    getMoivesFromAPI()
  }, [])

  const getUsersFromStorage = () => {
    if (!localStorage.getItem('reflixStorage')) {
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({ loggedUser: loggedUser, users: [] })
      )
    }
    const reflixStorage = JSON.parse(localStorage.getItem('reflixStorage'))
    return reflixStorage.users
  }

  const deleteUser = userId => {
    userId = parseInt(userId)
    const currentUsers = [...users]
    const filteredUsers = currentUsers.filter(
      user => parseInt(user.id) !== parseInt(userId)
    )
    setUsers(filteredUsers)
    removeUserFromStorage(userId)
  }

  const removeUserFromStorage = userId => {
    localStorage.setItem(
      'reflixStorage',
      JSON.stringify({
        loggedUser: loggedUser,
        users: users.filter(user => user.id !== 0),
      })
    )
  }
  const saveNewUser = (username, color) => {
    let maxId = 0
    users.forEach(user => {
      if (user.id > maxId) maxId = user.id + 1
    })
    ++maxId

    const newUser = {
      id: maxId,
      name: username,
      color: color,
      rentedMovies: [],
      budget: 10,
    }
    const currentUsers = [...users]
    currentUsers.push(newUser)
    setUsers(currentUsers)
    insertUserToStorage(newUser.id)
  }

  const insertUserToStorage = userId => {
    if (userId !== 0) {
      const userDetails = users.find(user => user.id === userId)
      const storageUsers = getUsersFromStorage()
      const usersWithout = storageUsers.filter(
        user => user.id !== userDetails.id
      )
      usersWithout.push(userDetails)
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({
          loggedUser: loggedUser,
          users: usersWithout,
        })
      )
    }
  }
  const logUserIn = userId => {
    if (!localStorage.getItem('reflixStorage')) {
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({ loggedUser: loggedUser, users: [] })
      )
    }
    const reflixStorage = JSON.parse(localStorage.getItem('reflixStorage'))
    setLoggedUser(userId)
    reflixStorage.loggedUser = userId
    localStorage.setItem('reflixStorage', JSON.stringify(reflixStorage))
  }
  const newRentReturnMovie = (userId, movieId, isRented) => {
    if (newUpdateBudget(userId, isRented)) {
      const newUsers = [...users]
      const userMovies = newUsers.find(user => user.id === userId).rentedMovies
      if (isRented) {
        userMovies.push(movieId)
      } else {
        let movieIndex = userMovies.findIndex(id => id === movieId)
        userMovies.splice(movieIndex, 1)
      }

      setUsers(newUsers)
      insertUserToStorage(userId)
    } else {
      alert('You dont have the budget!')
      return false
    }
  }
  const newUpdateBudget = (userId, isRented) => {
    const newUsers = [...users]
    let budgetChange = isRented ? -3 : 3
    const currentUser = newUsers.find(user => user.id === userId)
    if (currentUser.budget + budgetChange > 0) {
      currentUser.budget += budgetChange
      setUsers(newUsers)
      return true
    }
    return false
  }
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Route
          exact
          path='/'
          render={() => (
            <Landing
              deleteUser={deleteUser}
              saveNewUser={saveNewUser}
              logUserIn={logUserIn}
              users={users}
            />
          )}
        />
        <Route
          exact
          path='/catalog'
          render={({ match }) => (
            <Catalog
              users={users}
              match={match}
              rentReturnMovie={newRentReturnMovie}
              movies={movies}
              budget={budget}
            />
          )}
        />
        <Route
          exact
          path='/catalog/u/:id'
          render={({ match }) => (
            <Catalog
              users={users}
              match={match}
              rentReturnMovie={newRentReturnMovie}
              movies={movies}
              budget={budget}
            />
          )}
        />
        <Route
          exact
          path='/movies/:id'
          render={({ match }) => <MovieDetails match={match} movies={movies} />}
        />
      </div>
    </Router>
  )
}

export default App
