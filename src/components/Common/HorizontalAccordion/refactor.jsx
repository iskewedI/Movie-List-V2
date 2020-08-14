import React, { useState } from "react";
import * as classNames from "classnames";
import ExpandCard from "../ExpandCard/index";
import "./styles.css";
const HorizontalAccordion = ({ elements }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const halfOfList = Math.round(elements.length / 2) - 1;
  const isLengthEven = () => {
    return elements.length % 2 === 0;
  };

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
  const getDirectionToMove = (isActive, i) => {
    let direction = "";
    if (isActive) {
      direction = i <= halfOfList ? "" : "-";
    } else {
      direction = i < activeIndex ? "-" : "";
    }
    return direction;
  };
  const getTransformToMove = (isActive, i) => {
    let countX = 0;
    let direction = getDirectionToMove(isActive, i);

    if (isActive) {
      if (i === halfOfList) {
        countX = 0;
      } else {
        if (
          (direction === "" && halfOfList - i > 1) ||
          (direction === "-" && elements.length - halfOfList < i)
        ) {
          countX = 50;
        } else {
          countX = 10;
        }
      }
    } else {
      if (
        (direction === "" && elements.length - halfOfList < i) ||
        (direction === "-" && halfOfList - i > 1)
      ) {
        countX = 10;
      } else {
        countX = 30;
      }
    }

    return `translate3d(${direction}${countX}%, 0, 0)`;
  };
  const getTransformDefault = (i) => {
    let transform = "";
    let isInMiddle = false;

    if (
      (!isLengthEven() && i === halfOfList) ||
      (isLengthEven() && (i === halfOfList || i === halfOfList + 1))
    ) {
      isInMiddle = true;
    }
    if (!isInMiddle) {
      if (i < halfOfList) {
        let count = 10 * (halfOfList - i + 1);
        transform = `translate3d(${count}%,0,0)`;
      } else {
        let count = 20;
        if (isLengthEven()) {
          count = 10 * (i - halfOfList);
        } else {
          count = 10 * (i - halfOfList) + 10;
        }
        transform = `translate3d(-${count}%, 0, 0)`;
      }
    }

    return transform;
  };
  const getZIndex = (i) => {
    let zIndex = 0;
    let isInMiddle = false;
    if (
      (!isLengthEven() && i === halfOfList) ||
      (isLengthEven() && (i === halfOfList || i === halfOfList + 1))
    ) {
      isInMiddle = true;
    }
    if (!isInMiddle) {
      if (i < halfOfList) {
        zIndex = i - halfOfList;
      } else {
        zIndex = -(i - halfOfList);
      }
    }
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
