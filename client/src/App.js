import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './Components/NavBar'
import Register from './Components/Register'
import Login from './Components/Login'

class App extends React.Component {

  render() {

    return(
      <Router>
        <NavBar />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    )
  }
}

export default App
