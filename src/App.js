import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar.js'
import Home from './containers/Home.js'
import Welcome from './components/Welcome.js'
import DashBoard from './containers/DashBoard.js'
import IndexNavigation from './containers/IndexNavigation.js'
import CreateAccountForm from './components/CreateAccountForm.js'
import LogInForm from './components/LogInForm'
import Brewery from './containers/Brewery.js'
import Circuit from './containers/Circuit.js'
import User from './containers/User.js'

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Route exact path="/" component={Home} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/index/breweries" component={(routerProps) => <IndexNavigation path={routerProps.match.path} variant='breweries'/>} />
      <Route path="/breweries/:id" component={(routerProps) => <Brewery id={routerProps.match.params.id}/>} />
      <Route path="/index/circuits" component={(routerProps) => <IndexNavigation path={routerProps.match.path} variant='circuits'/>} />
      <Route path="/circuits/:id" component={(routerProps) => <Circuit id={routerProps.match.params.id}/>} />
      <Route path="/index/users" component={(routerProps) => <IndexNavigation path={routerProps.match.path} variant='users'/>} />
      <Route path="/users/:id" component={(routerProps) => <User id={routerProps.match.params.id}/>} />
      <Route exact path="/create-account" component={CreateAccountForm} />
      <Route exact path="/log-in" component={LogInForm} />
    </Router>
  )
}

export default App;
