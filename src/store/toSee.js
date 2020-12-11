import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend, omdbApi } from '../configs.json';

const slice = createSlice({
  name: 'toSee',
  initialState: {
    added: [],
    removed: [],
    collection: {
      ids: [],
      list: [],
      byId: {},
    },
    loaded: false,
    loading: false,
    hasError: false,
  },
  reducers: {
    movieRemoved: (toSee, action) => {
      let { byId, list } = toSee.collection;
      const { id } = action.payload;

      toSee.removed.push(byId[id]);

      list = list.filter(m => m.imdbID !== id);
      list = list.filter(m => m.imdbID !== id);

      delete byId[id];
    },
    movieAdded: (toSee, action) => {
      const { list, byId } = toSee.collection;
      const { movie } = action.payload;

      toSee.added.push(movie);

      list.push(movie);
      byId[movie.imdbID] = movie;
    },
    dataRequested: (toSee, action) => {
      const { list, byId } = toSee.collection;
      const movie = action.payload;

      list.push(movie);
      byId[movie.imdbID] = movie;
    },
    listsRequested: (toSee, action) => {
      toSee.loading = true;
    },
    listsReceived: (toSee, action) => {
      const { ids } = toSee.collection;

      ids.push(...action.payload[0].content);

      toSee.loaded = true;
      toSee.loading = false;
      toSee.hasError = false;
    },
    listsRequestFailed: (toSee, action) => {
      toSee.loaded = false;
      toSee.loading = false;
      toSee.hasError = true;
    },
  },
});

const {
  movieRemoved,
  movieAdded,
  dataRequested,
  listsRequested,
  listsReceived,
  listsRequestFailed,
} = slice.actions;

export default slice.reducer;

//Action creators

export const createList = name => (dispatch, getState) => {
  const { baseURL } = backend;

  const { list } = getState().entities.toSee;

  const url = '/lists';

  const data = {
    list,
    name,
  };
  return dispatch(
    apiCallBegan({
      method: 'POST',
      baseURL,
      url,
      data,
      onStart: listsRequested.type,
      onSuccess: listsReceived.type,
      onError: listsRequestFailed.type,
    })
  );
};

export const searchMyList = () => (dispatch, getState) => {
  const { loaded, loading } = getState().entities.toSee;

  if (loaded || loading) return;

  const { baseURL } = backend;

  const url = '/lists/myList';

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

export const searchMoviesInList = () => (dispatch, getState) => {
  const { ids, byId } = getState().entities.toSee.collection;

  const { baseURL, apiKey } = omdbApi;

  const customData = { byPassAuth: true };

  ids.forEach(id => {
    if (byId[id]) return; //Existing data

    const params = { i: id };

    return dispatch(
      apiCallBegan({
        baseURL,
        apiKey,
        params,
        customData,
        onStart: listsRequested.type,
        onSuccess: dataRequested.type,
        onError: listsRequestFailed.type,
      })
    );
  });
};

export const addToList = movie => (dispatch, getState) => {
  return dispatch(movieAdded({ movie }));
};
export const removeFromList = id => (dispatch, getState) => {
  return dispatch(movieRemoved({ id }));
};

export const getMovieInList = id =>
  createSelector(
    state => state.entities.toSee,
    toSee => toSee.collection.list.findIndex(m => m.imdbID === id) >= 0
  );

export const getListsLoading = createSelector(
  state => state.entities.toSee,
  toSee => toSee.loading
);

export const getMyList = createSelector(
  state => state.entities.toSee,
  toSee => toSee.collection.list
);

export const getChanges = createSelector(
  state => state.entities.toSee,
  toSee => ({ added: toSee.added, removed: toSee.removed })
);

export const getRequestHasError = createSelector(
  state => state.entities.toSee,
  toSee => toSee.collection.hasError
);
