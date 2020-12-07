import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend } from '../configs.json';

const slice = createSlice({
  name: 'toSee',
  initialState: {
    searchResults: [],
    tempCollection: [],
    collections: {
      byId: {},
      list: [],
    },
    loading: false,
    hasError: false,
  },
  reducers: {
    movieRemoved: (toSee, action) => {
      let { byId, list } = toSee.collections;
      const { id } = action.payload;
      list = list.filter(m => m.imdbID !== id);
      delete byId[id];
    },
    movieAdded: (toSee, action) => {
      const { list, byId } = toSee.collections;
      const { movie } = action.payload;
      list.push(movie);
      byId[movie.imdbID] = movie;
    },
    listsRequested: (toSee, action) => {
      toSee.loading = true;
    },
    moviesReceived: (toSee, action) => {
      toSee.searchResults = action.payload.Search;
      toSee.lastSearched = action.customData.searchTitle;
      toSee.loading = false;
      toSee.hasError = false;
    },
    toSeeRequestFailed: (toSee, action) => {
      toSee.searchResults = [];
      toSee.loading = false;
      toSee.hasError = true;
    },
  },
});

const {
  movieRemoved,
  movieAdded,
  listsRequested,
  listsReceived,
  listsRequestFailed,
} = slice.actions;

export default slice.reducer;

//Action creators
const { baseURL } = backend;
const url = '';

export const searchMyLists = token => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      baseURL,
      url,
      onStart: listsRequested.type,
      onSuccess: listsReceived.type,
      onError: listsRequestFailed.type,
    })
  );
};

export const addMovieToList = movie => (dispatch, getState) => {
  return dispatch(movieAdded({ movie }));
};
export const removeMovieInList = id => (dispatch, getState) => {
  return dispatch(movieRemoved({ id }));
};

export const getListsSearched = createSelector(
  state => state.entities.toSee,
  collections => collections.searchResults
);

export const getListsLoading = createSelector(
  state => state.entities.toSee,
  collections => collections.loading
);

export const getLists = createSelector(
  state => state.entities.toSee,
  collections => collections.movies
);

export const getListsHasError = createSelector(
  state => state.entities.toSee,
  collections => collections.hasError
);

export const getSearchedListsCount = createSelector(
  state => state.entities.toSee,
  collections => collections.searchResults.length
);
