import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { omdbApi } from '../configs.json';

const slice = createSlice({
  name: 'movies',
  initialState: {
    searchResults: [],
    listToSee: {
      byId: {},
      list: [],
    },
    loading: false,
    hasError: false,
    searchTitle: '',
    lastSearched: '',
  },
  reducers: {
    movieRemovedFromList: (movies, action) => {
      let { byId } = movies.listToSee;
      const { id } = action.payload;
      movies.listToSee.list = movies.listToSee.list.filter(m => m.imdbID !== id);
      delete byId[id];
    },
    movieAddedToList: (movies, action) => {
      const { list, byId } = movies.listToSee;
      const { movie } = action.payload;
      list.push(movie);
      byId[movie.imdbID] = movie;
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
      movies.hasError = false;
    },
    moviesRequestFailed: (movies, action) => {
      movies.searchResults = [];
      movies.loading = false;
      movies.hasError = true;
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
const { baseURL, apiKey } = omdbApi;
const url = '';

export const searchMovies = () => (dispatch, getState) => {
  const { searchTitle, lastSearched } = getState().entities.movies;

  if (searchTitle === lastSearched) return;

  const params = { s: searchTitle };
  return dispatch(
    apiCallBegan({
      baseURL,
      apiKey,
      url,
      params,
      customData: { searchTitle, byPassAuth: true },
      onStart: moviesRequested.type,
      onSuccess: moviesReceived.type,
      onError: moviesRequestFailed.type,
    })
  );
};

export const setSearchTitle = title => (dispatch, getState) => {
  const { searchTitle } = getState().entities.movies;
  if (title === searchTitle) return;
  return dispatch(searchTitleSetted({ title }));
};

export const addMovieToList = movie => (dispatch, getState) => {
  return dispatch(movieAddedToList({ movie }));
};
export const removeMovieInList = id => (dispatch, getState) => {
  return dispatch(movieRemovedFromList({ id }));
};
//Selectors
// export const getMovieById = (id) =>
//   createSelector(
//     (state) => state.entities.movies,
//     (movies) => movies.searchResults.filter((movie) => movie.id === id)
//   );

export const getSearchedMovies = createSelector(
  state => state.entities.movies,
  movies => movies.searchResults
);

export const getMoviesLoading = createSelector(
  state => state.entities.movies,
  movies => movies.loading
);
export const getMoviesHasError = createSelector(
  state => state.entities.movies,
  movies => movies.hasError
);

export const getMoviesCount = createSelector(
  state => state.entities.movies,
  movies => movies.searchResults.length
);
export const getSearchTitle = createSelector(
  state => state.entities.movies,
  movies => movies.searchTitle
);
export const getAllMoviesInList = createSelector(
  state => state.entities.movies,
  movies => movies.listToSee
);
export const getMovieInList = id =>
  createSelector(
    state => state.entities.movies,
    movies => movies.listToSee.list.findIndex(m => m.imdbID === id) >= 0
  );
