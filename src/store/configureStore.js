import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api],
  });
}
