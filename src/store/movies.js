import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    listToSee: [],
    loading: false,
    searchTitle: "",
    lastSearched: "",
  },
  reducers: {
    movieRemovedFromList: (movies, action) => {
      movies.listToSee = movies.listToSee.filter(
        (m) => m.imdbID !== action.payload.id
      );
    },
    movieAddedToList: (movies, action) => {
      movies.listToSee.push(action.payload.movie);
    },
    searchTitleSetted: (movies, action) => {
      const { title } = action.payload;
      movies.searchTitle = title;
    },
    moviesRequested: (movies, action) => {
      movies.loading = true;
    },
    moviesReceived: (movies, action) => {
      movies.searchResults = action.payload.Search;
      movies.lastSearched = action.customData.searchTitle;
      movies.loading = false;
    },
    moviesRequestFailed: (movies, action) => {
      movies.loading = false;
    },
  },
});

const {
  movieRemovedFromList,
  movieAddedToList,
  searchTitleSetted,
  moviesRequested,
  moviesReceived,
  moviesRequestFailed,
} = slice.actions;

export default slice.reducer;

//Action creators
const url = "";
export const searchMovies = () => (dispatch, getState) => {
  const { searchTitle, lastSearched } = getState().entities.movies;

  if (searchTitle === lastSearched) return;

  const params = { s: searchTitle };
  return dispatch(
    apiCallBegan({
      url,
      params,
      customData: { searchTitle },
      onStart: moviesRequested.type,
      onSuccess: moviesReceived.type,
      onError: moviesRequestFailed.type,
    })
  );
};

export const setSearchTitle = (title) => (dispatch, getState) => {
  const { searchTitle } = getState().entities.movies;
  if (title === searchTitle) return;
  return dispatch(searchTitleSetted({ title }));
};

export const addMovieToList = (movie) => (dispatch, getState) => {
  return dispatch(movieAddedToList({ movie }));
};
export const removeMovieInList = (id) => (dispatch, getState) => {
  return dispatch(movieRemovedFromList({ id }));
};
//Selectors
// export const getMovieById = (id) =>
//   createSelector(
//     (state) => state.entities.movies,
//     (movies) => movies.searchResults.filter((movie) => movie.id === id)
//   );

export const getSearchedMovies = createSelector(
  (state) => state.entities.movies,
  (movies) => movies.searchResults
);

export const getMoviesLoading = createSelector(
  (state) => state.entities.movies,
  (movies) => movies.loading
);

export const getMoviesCount = createSelector(
  (state) => state.entities.movies,
  (movies) => movies.searchResults.length
);
export const getSearchTitle = createSelector(
  (state) => state.entities.movies,
  (movies) => movies.searchTitle
);
export const getMovieInList = (id) =>
  createSelector(
    (state) => state.entities.movies,
    (movies) => movies.listToSee.findIndex((m) => m.imdbID === id) >= 0
  );
