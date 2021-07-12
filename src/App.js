import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OneFilm from "./components/OneFilm/OneFilm";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/info/:id">
            <OneFilm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
