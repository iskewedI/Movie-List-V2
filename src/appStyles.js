import { makeStyles } from "@material-ui/core";

const centeredStyledObj = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export default makeStyles({
  container: {
    height: "100vh",
    flexDirection: "column",
    ...centeredStyledObj,
  },
  cardContainer: {
    backgroundColor: "rgba(190, 247, 238, 0.29)",
    flexDirection: "column",
    width: 400,
    height: 200,
    padding: "2rem",
    ...centeredStyledObj,
  },
  title: {
    fontSize: "4rem",
  },
  titleGridContainer: {
    ...centeredStyledObj,
  },
  textFieldSearch: {
    width: "90%",
  },
  searchButton: {},
  buttonsContainer: {
    marginTop: ".5rem",
  },
  movieIcon: {
    fontSize: "4rem",
  },
});
