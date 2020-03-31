import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { RandomMovie } from "./RandomMovie";
import { AwesomeMovies } from "./AwesomeMovies";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import { Jumbotron } from "./components/Jumbotron";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>
        <Jumbotron></Jumbotron>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/randommovie" component={RandomMovie} />
              <Route exact path="/awesomemovies" component={AwesomeMovies} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
