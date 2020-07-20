import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar.js'
import IndexNavigation from './containers/IndexNavigation.js'
import CreateAccountForm from './components/CreateAccountForm.js'
import LogInForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm.js'

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Route path="/breweries" component={() => <IndexNavigation variant='breweries'/>} />
      <Route path="/circuits" component={() => <IndexNavigation variant='circuits'/>} />
      <Route path="/runners" component={() => <IndexNavigation variant='runners'/>} />
      <Route path="/create-account" component={CreateAccountForm} />
      <Route path="/log-in" component={LogInForm} />
      <Route exact path="/log-out" component={LogOutForm} />
    </Router>
  )
}

export default App;
