import React from "react";
import * as classNames from "classnames";

const ExpandCard = ({
  data,
  setActive,
  index,
  active,
  focused,
  shiftLeft,
  isLast,
}) => {
  // const dispatch = useDispatch();

  // const deleteFromList = () => {
  //   dispatch(removeMovieInList(imdbID));
  // };

  const getWidth = (isActive) => {
    let w = !isActive ? "calc(20vw - 20px)" : "300";
    return w;
  };
  const styles = {
    container: {
      transform: (function () {
        return active
          ? "scale(1.1) translate3d(0, 0, 0)"
          : "scale(1) translate3d(0, 0, 0)";
      })(),
    },
    item: {
      transform: (function () {
        let direction = shiftLeft ? "-" : "";
        let transform =
          focused && !active
            ? "translate3d(" + direction + "50%, 0, 0)"
            : "translate3d(0, 0, 0)";
        return transform;
      })(),
    },
    background: {
      background: "url(" + data.Poster + ") no-repeat center center",
      backgroundSize: "cover",
      height: "400px",
      width: getWidth(active),
    },
  };
  const classes = classNames({
    expandCard: true,
    isActive: active,
    isLast,
    shiftLeft,
  });

  const dataToShow = [];
  return (
    <li className={classes} style={styles.item}>
      {/* <div className="expandCard--content"> */}
      <h3 className="expandCard--content">{data.Title}</h3>
      {/* <div className="data-list"> */}
      {/* <ul className="menu vertical">
            {dataToShow.map((d, i) => (
              <li key={i}>
                <a href="/#">
                  <h4 className="datalist-title">{d}</h4>
                  <h5 className="datalist-description">{data[d]}</h5>
                </a>
              </li>
            ))}
          </ul> */}
      {/* </div> */}
      {/* </div> */}
      <div
        className="expandCard--image-container"
        onClick={() => setActive(index)}
        style={styles.container}
      >
        <div className="expandCard--image" style={styles.background}></div>
      </div>
      <div className="expandCard--name">
        <h6>{data.Title}</h6>
      </div>
      <div className="expandCard--closeButton">
        <a href="#">Back</a>
      </div>
    </li>
  );
};

export default ExpandCard;
