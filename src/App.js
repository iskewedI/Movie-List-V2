import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import configureStore from "./store/configureStore";
import Navbar from "./components/Navbar/";
import Home from "./components/Pages/Home/index";
import NotFound from "./components/Pages/NotFound/index";
import ListToSee from "./components/Pages/ListToSee/index";
import styles from "./appStyles";
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/listToSee" component={ListToSee} />
        <Route path="/home" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </Provider>
  );
}

export default App;
