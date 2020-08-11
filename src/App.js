import React, { useState } from "react";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";

import configureStore from "./store/configureStore";
import { searchMovies, setSearchTitle } from "./store/movies";

import SearchCard from "./components/SearchCard/";
import DialogResults from "./components/DialogResults/";
import styles from "./appStyles";
const store = configureStore();

function App() {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = (movieTitle) => {
    store.dispatch(setSearchTitle(movieTitle));
    store.dispatch(searchMovies());
    setDialogOpen(true);
  };
  return (
    <Provider store={store}>
      <Container className={classes.container}>
        <SearchCard onSearch={handleSearch} />
        {dialogOpen && (
          <DialogResults
            title={"Select the movie"}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </Container>
    </Provider>
  );
}

export default App;
