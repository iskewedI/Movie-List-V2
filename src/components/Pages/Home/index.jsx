import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { searchMovies, setSearchTitle } from "../../../store/movies";
import SearchCard from "../../SearchCard/";
import DialogResults from "../../DialogResults/";
import styles from "./styles";
const Home = () => {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = (movieTitle) => {
    dispatch(setSearchTitle(movieTitle));
    dispatch(searchMovies());
    setDialogOpen(true);
  };
  return (
    <Container className={classes.container}>
      <SearchCard onSearch={handleSearch} />
      {dialogOpen && (
        <DialogResults
          title={"Select the movie"}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Container>
  );
};

export default Home;
