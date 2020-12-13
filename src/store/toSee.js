import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend, omdbApi } from '../configs.json';
import { AddToHomeScreen } from '@material-ui/icons';

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
    loaded: false,
    loading: false,
    hasError: false,
    errorString: '',
  },
  reducers: {
    movieRemoved: (toSee, action) => {
      let { byId, list } = toSee.collection;
      const { movie } = action.payload;

      if (byId[movie.imdbID]) {
        toSee.removed.push(movie);
      }

      toSee.added = toSee.added.filter((m) => m.imdbID !== movie.imdbID);
    },
    movieAdded: (toSee, action) => {
      const { list, byId } = toSee.collection;
      const { movie } = action.payload;

      if (!byId[movie.imdbID]) {
        toSee.added.push(movie);
      }

      toSee.removed = toSee.removed.filter((m) => m.imdbID !== movie.imdbID);
    },
    saveChangesRequested: (toSee, action) => {
      toSee.loading = true;
    },
    saveChangesReceived: (toSee, action) => {
      const { collection } = toSee;
      const { content, name } = action.payload;

      collection.ids = content;
      collection.list = collection.list.filter((e) => content.includes(e.imdbID));
      collection.byId = { ...content.map((e) => collection.byId[e]) };

      toSee.name = name || toSee.name;

      toSee.added = [];
      toSee.removed = [];

      toSee.loading = false;
      toSee.loaded = true;
      toSee.hasError = false;
      toSee.errorString = '';
    },

    saveChangesRequestFailed: (toSee, action) => {
      toSee.errorString = action.payload.message;

      toSee.loading = false;
      toSee.loaded = true;
      toSee.hasError = true;
    },
    dataRequested: (toSee, action) => {
      const { list, byId } = toSee.collection;
      const movie = action.payload;

      list.push(movie);
      byId[movie.imdbID] = movie;
    },
    listCreateRequested: (toSee, action) => {
      toSee.loading = true;
    },
    listCreateReceived: (toSee, action) => {
      const dbData = action.payload;

      toSee.name = dbData.name;

      toSee.collection.ids = [...dbData.content];

      toSee.loaded = true;
      toSee.loading = false;
      toSee.hasError = false;
    },
    listCreateRequestFailed: (toSee, action) => {
      toSee.loaded = true;
      toSee.loading = false;
      toSee.hasError = true;

      const { message } = action.payload;
      toSee.errorString = message;
    },
    listsRequested: (toSee, action) => {
      toSee.loading = true;
    },
    listsReceived: (toSee, action) => {
      const list = action.payload[0];

      toSee.name = list.name;

      toSee.collection.ids.push(...list.content);

      toSee.loaded = true;
      toSee.loading = false;
      toSee.hasError = false;
    },
    listsRequestFailed: (toSee, action) => {
      toSee.loaded = true;
      toSee.loading = false;
      toSee.hasError = true;

      toSee.errorString = action.payload;
    },
  },
});

const {
  movieRemoved,
  movieAdded,
  dataRequested,
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

export const createList = (name) => (dispatch, getState) => {
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
  const { baseURL } = backend;

  const { added, removed, name } = getState().entities.toSee;

  const url = '/lists';

  const data = {
    name,
    added: [...added.map((a) => a.imdbID)],
    removed: [...removed.map((r) => r.imdbID)],
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

  ids.forEach((id) => {
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

export const addToList = (movie) => (dispatch, getState) => {
  return dispatch(movieAdded({ movie }));
};
export const removeFromList = (movie) => (dispatch, getState) => {
  return dispatch(movieRemoved({ movie }));
};

export const getMovieInList = (id) =>
  createSelector(
    (state) => state.entities.toSee,
    (toSee) => {
      let index = toSee.collection.list.findIndex((m) => m.imdbID === id);
      if (index >= 0) return true;
      let toAddListIndex = toSee.added.findIndex((m) => m.imdbID === id);
      if (toAddListIndex >= 0) return true;
    }
  );

export const getListsLoading = createSelector(
  (state) => state.entities.toSee,
  (toSee) => toSee.loading
);

export const getListName = createSelector(
  (state) => state.entities.toSee,
  (toSee) => toSee.name
);

export const getListLength = createSelector(
  (state) => state.entities.toSee,
  (toSee) => toSee.collection.ids.length
);

export const getMyList = createSelector(
  (state) => state.entities.toSee,
  (toSee) => toSee.collection.list
);

export const getChanges = createSelector(
  (state) => state.entities.toSee,
  (toSee) => ({ added: toSee.added, removed: toSee.removed })
);

export const getRequestHasError = createSelector(
  (state) => state.entities.toSee,
  (toSee) => ({ hasError: toSee.hasError, message: toSee.errorString })
);
