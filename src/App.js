import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Routes/Home';
import Quiz from './Routes/Quiz';
import Error from './Routes/Error';


function App() {
  const [id, setId] = useState("1")


  return (
    <div className="container">
      <Router>

        <Switch>

          <Route exact path="/">
            <Redirect exact from="/" to="/home" />
          </Route>

          <Route exact path="/home">
            <Home setId={setId} />
          </Route>

          <Route exact path="/quiz">
            <Quiz id={id} />
          </Route>

          <Route>
            <Error />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
