import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "../../store/configureStore";
import configs from "../../configs.json";
import {
  setSearchTitle,
  getSearchTitle,
  searchMovies,
} from "./../../store/movies";

describe("moviesSlice", () => {
  let fakeAxios;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });
  const moviesSlice = () => store.getState().entities.movies;
  const createState = () => ({
    entities: {
      movies: {
        searchResults: [],
        listToSee: [],
        searchTitle: "",
      },
    },
  });

  describe("searching movies", () => {
    let piratesSearch;
    beforeEach(() => {
      piratesSearch = {
        Search: [
          {
            Title: "First Pirate Movie",
            imdbID: "FirstPirateMovieId",
            Type: "movie",
            Poster: "/",
          },
          {
            Title: "Second Pirate Movie",
            imdbID: "SecondPirateMovieId",
            Type: "movie",
            Poster: "/",
          },
          {
            Title: "Third Pirate Movie",
            imdbID: "ThirdPirateMovieId",
            Type: "movie",
            Poster: "/",
          },
        ],
      };
    });
    describe("setting search text", () => {
      it("should set the search text", async () => {
        await store.dispatch(setSearchTitle("pirates"));

        const state = createState();
        state.entities.movies.searchTitle = "pirates";

        const title = getSearchTitle(state);

        expect(title).toEqual("pirates");
      });
    });
    describe("searching with the setted search text", () => {
      it("should don't save results to the store if the servers not returns correctly", async () => {
        fakeAxios.onGet().reply(500);

        await store.dispatch(setSearchTitle("pirates"));
        await store.dispatch(searchMovies());

        expect(moviesSlice().searchResults).toHaveLength(0);
      });
      describe("if it's a new title to search", () => {
        it("should do the search and save it to the store if the server returns correctly", async () => {
          fakeAxios.onGet().reply(200, piratesSearch);

          await store.dispatch(setSearchTitle("pirates"));
          await store.dispatch(searchMovies());

          expect(moviesSlice().searchResults).toStrictEqual(
            piratesSearch.Search
          );
        });
      });
      describe("if it's the same last title to search", () => {
        it("shouldn't do the search and retrieve the last search results", async () => {
          fakeAxios.onGet().reply(200, piratesSearch);

          await store.dispatch(setSearchTitle("pirates"));
          await store.dispatch(searchMovies());
          await store.dispatch(searchMovies());

          expect(fakeAxios.history.get.length).toBe(1);
        });
      });
    });
  });
});
