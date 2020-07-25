import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {autoLogInUser} from './actions/user.js'
import NavigationBar from './components/NavigationBar.js'
import Home from './containers/Home.js'
import Welcome from './components/Welcome.js'
import Dashboard from './containers/Dashboard.js'
import CreateAccountForm from './components/CreateAccountForm.js'
import EditAccountForm from './components/EditAccountForm.js'
import LogInForm from './components/LogInForm.js'
import Brewery from './containers/Brewery.js'
import Breweries from './containers/Breweries.js'
import Circuit from './containers/Circuit.js'
import Circuits from './containers/Circuits.js'
import Review from './containers/Review.js'
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
        <Route exact path="/breweries/reviews/:id" component={(routerProps) => <Review variant='brewery-review' id={routerProps.match.params.id}/>} />

        <Route exact path="/circuits" component={Circuits} />
        <Route exact path="/circuits/:id" component={(routerProps) => <Circuit id={routerProps.match.params.id}/>} />
        <Route exact path="/circuits/reviews/:id" component={(routerProps) => <Review variant='circuit-review' id={routerProps.match.params.id} />} />

        <Route exact path="/users" component={Users} />
        <Route path="/users/:id" component={(routerProps) => <User id={routerProps.match.params.id}/>} />

        <Route exact path="/create-account" component={CreateAccountForm} />
        <Route exact path="/log-in" component={LogInForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/edit-account" component={EditAccountForm} />
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