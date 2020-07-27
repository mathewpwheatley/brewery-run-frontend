import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {autoLogInUser} from './actions/user.js'
import NavigationBar from './components/NavigationBar.js'
import Home from './containers/Home.js'
import Welcome from './components/Welcome.js'
import Dashboard from './containers/Dashboard.js'
import CreateUserForm from './components/CreateUserForm.js'
import EditUserForm from './components/EditUserForm.js'
import LogInForm from './components/LogInForm.js'
import Brewery from './containers/Brewery.js'
import Breweries from './containers/Breweries.js'
import Circuit from './containers/Circuit.js'
import Circuits from './containers/Circuits.js'
import User from './containers/User.js'
import Users from './containers/Users.js'

class App extends Component {

  // Automatically log in on component mount if valid jwt cookie exists
  componentDidMount() {
    this.props.autoLogInUser()
  }

  render () {
    return (
      <Router>
        <NavigationBar/>
        <Route exact path="/" component={Home} />
        <Route exact path="/welcome" component={Welcome} />

        <Route exact path="/breweries" component={Breweries} />
        <Route exact path="/breweries/:id" component={(routerProps) => <Brewery id={routerProps.match.params.id}/>} />

        <Route exact path="/circuits" component={Circuits} />
        <Route exact path="/circuits/:id" component={(routerProps) => <Circuit id={routerProps.match.params.id}/>} />

        <Route exact path="/users" component={Users} />
        <Route path="/users/:id" component={(routerProps) => <User id={routerProps.match.params.id}/>} />

        <Route exact path="/create-user" component={CreateUserForm} />
        <Route exact path="/log-in" component={LogInForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/edit-user" component={EditUserForm} />
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogInUser: () => {dispatch(autoLogInUser())}
  }
}

export default connect(null, mapDispatchToProps)(App)