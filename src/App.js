import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetails from './components/MovieDetails'
import Nav from './components/Nav'
import moviesData from './data/movies'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [
        {
          id: 0,
          name: 'default',
          color: 'gray',
          rentedMovies: [],
          budget: 10,
        },
        ...this.getUsersFromStorage(),
      ],
      budget: 10,
      movies: moviesData,
    } // endof State
  }
  getUsersFromStorage = () => {
    if (!localStorage.getItem('reflixStorage')) {
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({ loggedUser: this.state.loggedUser, users: [] })
      )
    }
    const reflixStorage = JSON.parse(localStorage.getItem('reflixStorage'))

    return reflixStorage.users
  }
  insertUserToStorage = userId => {
    if (userId !== 0) {
      const userDetails = this.state.users.find(user => user.id === userId)
      const storageUsers = this.getUsersFromStorage()
      const usersWithout = storageUsers.filter(
        user => user.id !== userDetails.id
      )
      usersWithout.push(userDetails)
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({
          loggedUser: this.state.loggedUser,
          users: usersWithout,
        })
      )
    }
  }
  logUserIn = userId => {
    if (!localStorage.getItem('reflixStorage')) {
      localStorage.setItem(
        'reflixStorage',
        JSON.stringify({ loggedUser: this.state.loggedUser, users: [] })
      )
    }
    const reflixStorage = JSON.parse(localStorage.getItem('reflixStorage'))
    this.setState(
      {
        loggedUser: userId,
      },
      () => {
        reflixStorage.loggedUser = userId
        localStorage.setItem('reflixStorage', JSON.stringify(reflixStorage))
      }
    )
  }
  newRentReturnMovie = (userId, movieId, isRented) => {
    if (this.newUpdateBudget(userId, isRented)) {
      const users = [...this.state.users]
      const userMovies = users.find(user => user.id === userId).rentedMovies
      if (isRented) {
        userMovies.push(movieId)
      } else {
        let movieIndex = userMovies.findIndex(id => id === movieId)
        userMovies.splice(movieIndex, 1)
      }
      this.setState(
        {
          users,
        },
        () => {
          this.insertUserToStorage(userId)
        }
      )
    } else {
      alert('You dont have the budget!')
      return false
    }
  }
  newUpdateBudget(userId, isRented) {
    const users = [...this.state.users]
    let budgetChange = isRented ? -3 : 3
    const currentUser = users.find(user => user.id === userId)
    if (currentUser.budget + budgetChange > 0) {
      currentUser.budget += budgetChange
      this.setState({
        users: users,
      })
      return true
    }
    return false
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Nav />
          <Route
            exact
            path='/'
            render={() => (
              <Landing logUserIn={this.logUserIn} users={this.state.users} />
            )}
          />
          <Route
            exact
            path='/catalog'
            render={({ match }) => (
              <Catalog
                users={this.state.users}
                match={match}
                rentReturnMovie={this.rentReturnMovie}
                movies={this.state.movies}
                budget={this.state.budget}
              />
            )}
          />
          <Route
            exact
            path='/catalog/u/:id'
            render={({ match }) => (
              <Catalog
                users={this.state.users}
                match={match}
                rentReturnMovie={this.newRentReturnMovie}
                movies={this.state.movies}
                budget={this.state.budget}
              />
            )}
          />
          <Route
            exact
            path='/movies/:id'
            render={({ match }) => MovieDetails(match, this.state.movies)}
          />
        </div>
      </Router>
    )
  }
}

export default App
