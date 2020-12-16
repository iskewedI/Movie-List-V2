import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend, omdbApi } from '../configs.json';

const slice = createSlice({
  name: 'toSee',
  initialState: {
    name: null,
    added: [],
    removed: [],
    collection: {
      ids: [],
      list: [],
      byId: {},
    },
    loading: false,

    searchingMovies: false,
    moviesSearched: false,

    searchingDb: false,
    dbSearched: false,

    hasError: false,
    errorString: '',
  },
  reducers: {
    inListSwitched: (toSee, action) => {
      const { collection } = toSee;
      const { movie } = action.payload;

      if (!collection.byId[movie.imdbID]) {
        toSee.added.push(movie);
        toSee.removed = toSee.removed.filter(e => e.imdbID !== movie.imdbID);

        collection.list.push(movie);
        collection.ids.push(movie.imdbID);
        collection.byId[movie.imdbID] = movie;
      } else {
        toSee.removed.push(movie);
        toSee.added = toSee.added.filter(e => e.imdbID !== movie.imdbID);

        collection.list = collection.list.filter(e => e.imdbID !== movie.imdbID);
        collection.ids = collection.ids.filter(e => e !== movie.imdbID);
        delete collection.byId[movie.imdbID];
      }
    },
    saveChangesRequested: (toSee, action) => {
      toSee.loading = true;
    },
    saveChangesReceived: (toSee, action) => {
      const { collection } = toSee;
      const { content, name } = action.payload;

      collection.ids = content;

      toSee.name = name || toSee.name;

      toSee.added = [];
      toSee.removed = [];

      toSee.loading = false;

      toSee.hasError = false;
      toSee.errorString = '';
    },

    saveChangesRequestFailed: (toSee, action) => {
      toSee.errorString = action.payload.message;

      toSee.loading = false;

      toSee.hasError = true;
    },
    dataRequested: (toSee, action) => {
      toSee.loading = true;
      toSee.searchingMovies = true;
    },
    dataRequestedReceived: (toSee, action) => {
      const { list, byId } = toSee.collection;
      const movie = action.payload;

      list.push(movie);
      byId[movie.imdbID] = movie;

      toSee.loading = false;

      toSee.moviesSearched = true;
      toSee.searchingMovies = false;
    },
    dataRequestedFailed: (toSee, action) => {
      toSee.loading = false;
      toSee.searchingMovies = false;

      toSee.hasError = true;

      const { message } = action.payload;
      toSee.errorString = message;
    },
    listCreateRequested: (toSee, action) => {
      toSee.loading = true;
    },
    listCreateReceived: (toSee, action) => {
      const dbData = action.payload;

      toSee.name = dbData.name;

      toSee.collection.ids = [...dbData.content];

      toSee.loading = false;
      toSee.hasError = false;
    },
    listCreateRequestFailed: (toSee, action) => {
      toSee.loading = false;
      toSee.hasError = true;

      const { message } = action.payload;
      toSee.errorString = message;
    },
    listsRequested: (toSee, action) => {
      toSee.loading = true;
      toSee.searchingDb = true;
    },
    listsReceived: (toSee, action) => {
      const lists = action.payload;

      if (lists.length > 0) {
        toSee.name = lists[0].name;
        toSee.collection.ids.push(...lists[0].content);
      }

      toSee.loading = false;

      toSee.searchingDb = false;
      toSee.dbSearched = true;

      toSee.hasError = false;
    },
    listsRequestFailed: (toSee, action) => {
      toSee.loading = false;

      toSee.searchingDb = false;
      toSee.dbSearched = true;

      toSee.hasError = true;

      toSee.errorString = action.payload;
    },
  },
});

const {
  inListSwitched,
  dataRequested,
  dataRequestedReceived,
  dataRequestedFailed,
  saveChangesRequested,
  saveChangesReceived,
  saveChangesRequestFailed,
  listCreateRequested,
  listCreateReceived,
  listCreateRequestFailed,
  listsRequested,
  listsReceived,
  listsRequestFailed,
} = slice.actions;

export default slice.reducer;

//Action creators

export const createList = name => (dispatch, getState) => {
  const { baseURL } = backend;

  const { ids } = getState().entities.toSee.collection;

  const url = '/lists';

  const data = {
    content: ids || [],
    name,
  };
  return dispatch(
    apiCallBegan({
      method: 'POST',
      baseURL,
      url,
      data,
      onStart: listCreateRequested.type,
      onSuccess: listCreateReceived.type,
      onError: listCreateRequestFailed.type,
    })
  );
};

export const saveList = () => (dispatch, getState) => {
  const { added, removed, name } = getState().entities.toSee;

  if (added.length === 0 && removed.length === 0) return;

  const { baseURL } = backend;

  const url = '/lists';

  const data = {
    name,
    added: [...added.map(a => a.imdbID)],
    removed: [...removed.map(r => r.imdbID)],
  };

  return dispatch(
    apiCallBegan({
      method: 'PUT',
      baseURL,
      url,
      data,
      onStart: saveChangesRequested.type,
      onSuccess: saveChangesReceived.type,
      onError: saveChangesRequestFailed.type,
    })
  );
};

export const searchMyList = () => (dispatch, getState) => {
  const { searchingDb, dbSearched } = getState().entities.toSee;

  if (searchingDb || dbSearched) return;

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
  const { collection, searchingMovies, moviesSearched } = getState().entities.toSee;

  if (moviesSearched || searchingMovies) return;

  const { baseURL, apiKey } = omdbApi;

  const customData = { byPassAuth: true };

  collection.ids.forEach(id => {
    if (collection.byId[id]) return; //Existing data

    const params = { i: id };

    return dispatch(
      apiCallBegan({
        baseURL,
        apiKey,
        params,
        customData,
        onStart: dataRequested.type,
        onSuccess: dataRequestedReceived.type,
        onError: dataRequestedFailed.type,
      })
    );
  });
};

export const switchInList = movie => (dispatch, getState) => {
  return dispatch(inListSwitched({ movie }));
};

export const getMovieInList = id =>
  createSelector(
    state => state.entities.toSee,
    toSee => {
      let index = toSee.collection.list.findIndex(m => m.imdbID === id);
      if (index >= 0) return true;
      let toAddListIndex = toSee.added.findIndex(m => m.imdbID === id);
      if (toAddListIndex >= 0) return true;
    }
  );

export const getListsLoading = createSelector(
  state => state.entities.toSee,
  toSee => toSee.loading
);

export const getListName = createSelector(
  state => state.entities.toSee,
  toSee => toSee.name
);

export const getListLength = createSelector(
  state => state.entities.toSee,
  toSee => toSee.collection.list.length
);

export const getMyList = createSelector(
  state => state.entities.toSee,
  toSee => toSee.collection.list
);

export const getListHasChanges = createSelector(
  state => state.entities.toSee,
  toSee => toSee.added.length > 0 || toSee.removed.length > 0
);

export const getChanges = createSelector(
  state => state.entities.toSee,
  toSee => ({ added: toSee.added, removed: toSee.removed })
);

export const getRequestHasError = createSelector(
  state => state.entities.toSee,
  toSee => ({ hasError: toSee.hasError, message: toSee.errorString })
);
