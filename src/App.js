import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Contact from './components/contact/Contact';
import Companies from './components/Companies/Companies';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signin">
            {isConnected ? <Redirect to="/" /> : <Login setIsConnected={setIsConnected} />}
          </Route>
          <Route exact path="/">
            {isConnected ? <Contact setIsConnected={setIsConnected} /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/companies">
            {isConnected ? <Companies setIsConnected={setIsConnected} /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
