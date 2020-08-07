import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Routes/Home';
import Quiz from './Routes/Quiz';
import Error from './Routes/Error';
import Admin from './Routes/Admin';
import NavBar from './Components/NavBar';
import Axios from 'axios';


function App() {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState(null);

  useEffect(() => {

    setIsLoading(true);
    setIsError(false);

    Axios

      .get(`https://5f280f4ef5d27e001612ea88.mockapi.io/categories`)

      .then((response) => {
        console.log(response.data);
        setDataCategories(response.data);
        setIsLoading(false);
      })

      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });

  }, []);


  return (
    <div >
      <Router>
        <NavBar />
        <Switch>

          <Route exact path="/">
            <Redirect exact from="/" to="/home" />
          </Route>

          <Route exact path="/home">
            <Home dataCategories={dataCategories} />
          </Route>

          <Route exact path="/quiz/:id">
            <Quiz />
          </Route>

          <Route exact path="/admin">
            <Admin dataCategories={dataCategories} isError={isError} isLoading={isLoading} />
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
