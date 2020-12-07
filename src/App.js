import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import configureStore from './store/configureStore';
import Navbar from './components/Project/Navbar/';
import Home from './components/Pages/Home/';
import NotFound from './components/Pages/NotFound/';
import ListToSee from './components/Pages/ListToSee/';
import RegisterPage from './components/Pages/Register/';
import LogInPage from './components/Pages/LogIn/';
import LogOutPage from './components/Pages/LogOut/';
import MePage from './components/Pages/Me/';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path='/me' component={MePage} />
        <Route path='/logout' component={LogOutPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LogInPage} />
        <Route path='/listToSee' component={ListToSee} />
        <Route path='/home' component={Home} />
        <Route path='/not-found' component={NotFound} />
        <Redirect exact from='/' to='/home' />
        <Redirect to='/not-found' />
      </Switch>
    </Provider>
  );
}

export default App;
