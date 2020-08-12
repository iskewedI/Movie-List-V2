import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  TextField,
  Button,
} from "@material-ui/core";
import styles from "./styles";
const SearchCard = ({ onSearch }) => {
  const classes = styles();
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.cardContainer}>
        <Typography className={classes.title}>Búsqueda</Typography>
        <TextField
          className={classes.textField}
          value={searchText}
          placeholder="Ingrese su búsqueda..."
          onChange={handleTextChange}
          InputProps={{ classes: { input: classes.inputPlaceHolder } }}
        />
        <Button
          className={classes.searchButton}
          variant="outlined"
          color="primary"
          onClick={() => onSearch(searchText)}
        >
          Buscar
        </Button>
      </Card>
    </Container>
  );
};

export default SearchCard;
