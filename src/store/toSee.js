import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend, omdbApi } from '../configs.json';

const slice = createSlice({
  name: 'toSee',
  initialState: {
    name: null,
    added: {},
    removed: {},
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
      const movie = { ...action.payload.movie };

      if (!collection.byId[movie.imdbID] && !toSee.added[movie.imdbID]) {
        movie.change = 'added';

        toSee.added[movie.imdbID] = movie;
        delete toSee.removed[movie.imdbID];
      } else if (!collection.byId[movie.imdbID] && toSee.added[movie.imdbID]) {
        delete toSee.added[movie.imdbID];
      } else if (collection.byId[movie.imdbID] && toSee.removed[movie.imdbID]) {
        delete toSee.removed[movie.imdbID];
      } else {
        movie.change = 'removed';

        toSee.removed[movie.imdbID] = movie;
        delete toSee.added[movie.imdbID];
      }
    },
    saveChangesRequested: (toSee, action) => {
      toSee.loading = true;
    },
    saveChangesReceived: (toSee, action) => {
      const { collection } = toSee;
      const { content, name } = action.payload;

      collection.ids = content ? content.split(';') : [];

      toSee.name = name || toSee.name;

      Object.values(toSee.removed).forEach(r => delete collection.byId[r.imdbID]);

      collection.list.push(...Object.values(toSee.added));
      collection.list = collection.list.filter(m => collection.ids.includes(m.imdbID));

      toSee.added = {};
      toSee.removed = {};

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
        const list = lists[0];
        toSee.name = list.name;
        if (list.content) {
          const arrayList = list.content.split(';');
          toSee.collection.ids.push(...arrayList);
        }
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
    added: Object.keys(added),
    removed: Object.keys(removed),
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
      return toSee.added[id] ? true : false;
    }
  );

export const getMovieChange = id =>
  createSelector(
    state => state.entities.toSee,
    toSee => (toSee.added[id] ? 'added' : toSee.removed[id] ? 'removed' : false)
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
  toSee => toSee.collection.ids.length + Object.keys(toSee.added).length
);

export const getMyList = createSelector(
  state => state.entities.toSee,
  toSee => [...toSee.collection.list, ...Object.values(toSee.added)]
);

export const getListHasChanges = createSelector(
  state => state.entities.toSee,
  toSee => Object.keys(toSee.added).length > 0 || Object.keys(toSee.removed).length > 0
);

export const getRequestHasError = createSelector(
  state => state.entities.toSee,
  toSee => ({ hasError: toSee.hasError, message: toSee.errorString })
);

export const getSearchingMovies = createSelector(
  state => state.entities.toSee,
  toSee => toSee.searchingMovies
);

export const getMoviesSearched = createSelector(
  state => state.entities.toSee,
  toSee => toSee.moviesSearched
);

export const getMyListSearched = createSelector(
  state => state.entities.toSee,
  toSee => toSee.dbSearched
);

export const getSearchingMyList = createSelector(
  state => state.entities.toSee,
  toSee => toSee.searchingDb
);
