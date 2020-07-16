import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar.js';


function App() {
  return (
    <Router>
      <NavigationBar/>
      {/* <Route exact path="/log-in" component={Login} /> */}
      {/* <Route exact path="/create-account" component={CreateAccount} /> */}
    </Router>
  );
}

export default App;
