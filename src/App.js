import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {autoLogInUser, getAllUsers} from './actions/user.js'
import {getAllBreweries} from './actions/brewery.js'
import {getAllCircuits} from './actions/circuit.js'
import NavigationBar from './components/NavigationBar.js'
import Home from './containers/Home.js'
import Welcome from './components/Welcome.js'
import DashBoard from './containers/DashBoard.js'
import CommonNavigation from './containers/CommonNavigation.js'
import CreateAccountForm from './components/CreateAccountForm.js'
import EditAccountForm from './components/EditAccountForm.js'
import LogInForm from './components/LogInForm.js'
import Brewery from './containers/Brewery.js'
import Circuit from './containers/Circuit.js'
import Review from './containers/Review.js'
import User from './containers/User.js'

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
        <Route exact path="/dashboard" component={DashBoard} />

        <Route exact path="/breweries" component={() => <CommonNavigation variant='breweries' data={this.props.breweries} getData={this.props.getAllBreweries} />} />
        <Route exact path="/breweries/:id" component={(routerProps) => <Brewery id={routerProps.match.params.id}/>} />
        <Route exact path="/breweries/reviews/:id" component={(routerProps) => <Review variant='brewery' id={routerProps.match.params.id}/>} />

        <Route exact path="/circuits" component={() => <CommonNavigation variant='circuits' data={this.props.circuits} getData={this.props.getAllCircuits} />} />
        <Route exact path="/circuits/:id" component={(routerProps) => <Circuit id={routerProps.match.params.id}/>} />
        <Route exact path="/circuits/reviews/:id" component={(routerProps) => <Review variant='circuit' id={routerProps.match.params.id} />} />

        <Route exact path="/users" component={() => <CommonNavigation variant='users' data={this.props.users} getData={this.props.getAllUsers} />} />
        <Route path="/users/:id" component={(routerProps) => <User id={routerProps.match.params.id}/>} />
        <Route exact path="/create-account" component={CreateAccountForm} />
        <Route exact path="/log-in" component={LogInForm} />
        <Route exact path="/edit-account" component={EditAccountForm} />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
      breweries: state.brewery.all,
      circuits: state.circuit.all,
      // notifications: state.notifications.all,
      users: state.user.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogInUser: () => {dispatch(autoLogInUser())},
    getAllBreweries: () => {dispatch(getAllBreweries())},
    getAllCircuits: () => {dispatch(getAllCircuits())},
    // getAllNotifications: () => {dispatch(getAllNotifications())},
    getAllUsers: () => {dispatch(getAllUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)