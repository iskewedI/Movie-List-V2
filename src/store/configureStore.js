import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer.js';
import api from './middleware/api';
import auth from './middleware/auth';

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), auth, api],
  });
}
