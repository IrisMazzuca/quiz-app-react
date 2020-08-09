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

  const [isErrorCategories, setIsErrorCategories] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [dataCategories, setDataCategories] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {

    setIsLoadingCategories(true);
    setIsErrorCategories(false);

    Axios

      .get(`https://5f280f4ef5d27e001612ea88.mockapi.io/categories`)

      .then((response) => {
        console.log(response.data);
        setDataCategories(response.data);
        setIsLoadingCategories(false);
      })

      .catch(() => {
        setIsLoadingCategories(false);
        setIsErrorCategories(true);
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

          <Route exact path="/quiz-app-react">
            <Redirect exact from="/quiz-app-react" to="/home" />
          </Route>

          <Route exact path="/home">
            <Home dataCategories={dataCategories} />
          </Route>

          <Route exact path="/quiz/:id">
            <Quiz dataCategories={dataCategories} isError={isError} setIsError={setIsError} isLoading={isLoading} setIsLoading={setIsLoading} data={data} setData={setData} />
          </Route>

          <Route exact path="/admin">
            <Admin dataCategories={dataCategories} isErrorCategories={isErrorCategories} isLoadingCategories={isLoadingCategories} data={data} />
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
