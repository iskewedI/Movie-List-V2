import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { omdbApi } from '../configs.json';

const slice = createSlice({
  name: 'movies',
  initialState: {
    searchResults: [],
    loading: false,
    hasError: false,
    searchTitle: '',
    lastSearched: '',
  },
  reducers: {
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

const { searchTitleSetted, moviesRequested, moviesReceived, moviesRequestFailed } =
  slice.actions;

export default slice.reducer;

//Action creators
const { baseURL } = omdbApi;
const apiKey = process.env.REACT_APP_API_KEY;
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
