import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetails from './components/MovieDetails'
import Nav from './components/Nav'
import './App.css'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

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
      movies: [
        {
          id: 0,
          isRented: false,
          title: 'Tarzan',
          year: 1999,
          img:
            'https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811',
          descrShort:
            "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out.",
        },
        {
          id: 1,
          isRented: false,
          title: 'The Lion King',
          img:
            'https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg',
          year: 1994,
          descrShort:
            'A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies.',
        },
        {
          id: 2,
          isRented: false,
          title: 'Beauty and the Beast',
          year: 1991,
          img:
            'https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg',
          descrShort:
            'A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself.',
        },
        {
          id: 3,
          isRented: false,
          title: 'The Sword in the Stone',
          year: 1963,
          img: 'https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg',
          descrShort:
            "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means.",
        },
        {
          id: 4,
          isRented: false,
          title: 'Beauty and the Beast',
          year: 2016,
          img:
            'https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg',
          descrShort:
            "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation.",
        },
      ],
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
    this.setState({
      users: reflixStorage.users,
    })
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

      //const movieToUpdate = userMovies.find(movie => movie.id === movieId)
      console.log('isrented', isRented)
      console.log('usermovies', userMovies)
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
