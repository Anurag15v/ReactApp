import React from 'react'
import Navbar from "./components/Navbar"
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import {Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Route exact path="/">
      <Dashboard/>
      </Route>
      <Route path="/signUp">
      <Signup/>
      </Route>
      <Route path="/login">
      <Login/>
      </Route>
    </div>
  )
}

export default App
