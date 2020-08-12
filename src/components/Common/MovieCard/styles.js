import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  cardRoot: {
    width: "25vw",
    maxWidth: 200,
    display: "grid",
    gridTemplateRows: "90% 10%",
  },
  actionArea: {
    height: "100%",
    "&:hover": {
      background:
        "linear-gradient(0deg, rgba(254,255,255,1) 0%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0) 100%)",
    },
  },
  cardContent: {
    height: "100%",
    padding: "0px",
  },
  image: {
    height: "100%",
    width: "100%",
    maxWidth: 200,
    display: "block",
    position: "absolute",
    "&:hover": {
      opacity: ".1",
    },
  },
  cardText: {
    color: "black",
    position: "absolute",
    textAlign: "center",
  },
});
