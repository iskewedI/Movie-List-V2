import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CardCollection from "../CardCollection";
import { getMoviesCount } from "./../../store/movies";
import styles from "./styles";

const DialogResults = ({ title, onClose }) => {
  const classes = styles();
  const [rangeToShow, setRangeToShow] = useState({ start: 0, end: 3 });
  const moviesCount = useSelector(getMoviesCount);

  const canMoveNext = rangeToShow.end < moviesCount;
  const canMoveBack = rangeToShow.start > 0;

  const hangleRangeChanged = (direction) => {
    if (direction === "next") {
      if (canMoveNext) {
        setRangeToShow({
          start: rangeToShow.start + 3,
          end: rangeToShow.end + 3,
        });
      }
    } else {
      if (canMoveBack) {
        setRangeToShow({
          start: rangeToShow.start - 3,
          end: rangeToShow.end - 3,
        });
      }
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ className: classes.paper }}
      >
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.content}>
          {<CardCollection rangeToShow={rangeToShow} />}
        </DialogContent>
        <DialogActions className={classes.navButtons}>
          <Button
            className={classes.arrowLeft}
            onClick={() => hangleRangeChanged("back")}
          >
            {<ArrowBackIcon color={canMoveBack ? "primary" : "disabled"} />}
          </Button>
          <Button
            className={classes.arrowRight}
            onClick={() => hangleRangeChanged("next")}
          >
            {<ArrowForwardIcon color={canMoveNext ? "primary" : "disabled"} />}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogResults;
