import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar.js'
import IndexNavigation from './containers/IndexNavigation.js'
import CreateAccountForm from './components/CreateAccountForm.js'
import LogInForm from './components/LogInForm'
import Home from './containers/Home.js'

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Route path="/breweries" component={() => <IndexNavigation variant='breweries'/>} />
      <Route path="/circuits" component={() => <IndexNavigation variant='circuits'/>} />
      <Route path="/users" component={() => <IndexNavigation variant='users'/>} />
      <Route exact path="/create-account" component={CreateAccountForm} />
      <Route exact path="/log-in" component={LogInForm} />
      <Route exact path="/" component={Home} />
    </Router>
  )
}

export default App;
