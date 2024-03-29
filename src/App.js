import React, { lazy, Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import configureStore from './store/configureStore';
import Navbar from './components/Project/Navbar/';
import Home from './components/Pages/Home/';
import NotFound from './components/Pages/NotFound/';
import MinimizedChatbot from './ChatBot/minimized';
import styles from './styles';

const ListToSee = lazy(() => import('./components/Pages/ListToSee/'));
const RegisterPage = lazy(() => import('./components/Pages/Register/'));
const LogInPage = lazy(() => import('./components/Pages/LogIn/'));
const LogOutPage = lazy(() => import('./components/Pages/LogOut/'));
const MePage = lazy(() => import('./components/Pages/Me/'));
const ChatBot = lazy(() => import('./ChatBot/'));

const store = configureStore();

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const classes = styles();

  return (
    <Provider store={store}>
      <Suspense fallback={<CircularProgress />}>
        <Navbar />
        <Switch>
          <Route path='/me' component={MePage} />
          <Route path='/logout' component={LogOutPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LogInPage} />
          <Route path='/listToSee' component={ListToSee} />
          <Route path='/' component={Home} />
          <Route path='/not-found' component={NotFound} />
          <Redirect to='/not-found' />
        </Switch>
      </Suspense>

      <div className={classes.chatBotContainer}>
        <Suspense fallback={<CircularProgress />}>
          {!chatbotOpen && <MinimizedChatbot onClick={() => setChatbotOpen(true)} />}
          <div className={classes.chatBot}>
            {chatbotOpen && <ChatBot onClose={() => setChatbotOpen(false)} />}
          </div>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
