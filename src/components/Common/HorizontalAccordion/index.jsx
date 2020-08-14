import React, { useState } from "react";
import * as classNames from "classnames";
import ExpandCard from "../ExpandCard/index";
import * as Helper from "./Helper";
import "./styles.css";
const HorizontalAccordion = ({ elements }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const halfIndex = Helper.getHalfIndexArray(elements);

  const handleClick = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };
  const lossFocus = (e) => {
    e.preventDefault();
    if (e.target.className !== "expandCard--image") {
      setActiveIndex(null);
      setOpen(false);
    }
  };
  const getIsLast = (i) => {
    return i === elements.length - 1;
  };
  const getIsFirst = (i) => {
    return i === 0;
  };

  const getDirectionToMove = (i, isActive) => {
    let direction = "";
    if (isActive) {
      direction = i <= halfIndex ? "" : "-";
    } else {
      direction = i < activeIndex ? "-" : "";
    }
    return direction;
  };
  const getActiveCountToMove = (arr, i) => {
    let countX = 0;
    let counts = [2, 2, 2, 1.5, 1.5, 1.5, 1, 1, 1];
    if (i !== halfIndex) {
      countX = counts[Helper.getDistanceToMiddle(arr, i)];
    }
    return countX;
  };
  const getDeactiveCountToMove = (arr, i) => {
    let counts = [1.7, 1.7, 1.7, 1, 1, 1, 0.7, 0.7, 0.7];
    let countX = counts[Helper.getDistanceToMiddle(arr, i)];
    return countX;
  };
  const getTransformToMove = (i, isActive) => {
    let countX = 0;
    let direction = getDirectionToMove(i, isActive);

    if (isActive) {
      countX = 10 * getActiveCountToMove(elements, i);
    } else {
      countX = 20 * getDeactiveCountToMove(elements, i);
    }

    return `translate3d(${direction}${countX}%, 0, 0)`;
  };
  const getTransformDefault = (i) => {
    let transform = "";
    let distanceToMiddle = Helper.getDistanceToMiddle(elements, i);
    if (distanceToMiddle !== 0) {
      let direction = getDirectionToMove(i, true);
      let distanceToMiddle = Helper.getDistanceToMiddle(elements, i);
      let count = 30 * distanceToMiddle;
      transform = `translate3d(${direction}${count}%, 0, 0)`;
    }
    return transform;
  };
  const getZIndex = (i) => {
    let zIndex = 0;

    zIndex = Helper.getInvertedDistanceToMiddle(elements, i);
    return zIndex;
  };
  const classes = classNames({
    focused: open,
  });
  return (
    <div
      className={"customAccordion--menu-container " + classes}
      onClick={lossFocus}
    >
      {elements.length <= 0 && <div>There's no movie in the list</div>}
      <ul className="customAccordion menu">
        {elements.map((m, i) => (
          <ExpandCard
            key={i}
            data={m}
            setActive={handleClick}
            index={i}
            active={i === activeIndex}
            focused={open}
            shiftLeft={i < activeIndex}
            isLast={getIsLast(i)}
            isFirst={getIsFirst(i)}
            getDirectionToMove={getDirectionToMove}
            getTransformToMove={getTransformToMove}
            getTransformDefault={getTransformDefault}
            getZIndex={getZIndex}
          />
        ))}
      </ul>
    </div>
  );
};

export default HorizontalAccordion;
