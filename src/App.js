import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar.js';
import Breweries from './containers/Breweries.js';
import Circuits from './containers/Circuits.js';
import TestFetch from './containers/TestFetch.js';


function App() {
  return (
    <Router>
      <NavigationBar/>
      <Route path="/breweries" component={Breweries} />
      <Route path="/circuits" component={Circuits} />
      <Route exact path="/test-fetch" component={TestFetch} />
      {/* <Route exact path="/log-in" component={Login} /> */}
      {/* <Route exact path="/create-account" component={CreateAccount} /> */}
    </Router>
  );
}

export default App;
