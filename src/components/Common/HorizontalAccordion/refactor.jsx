import React, { useState } from "react";
import * as classNames from "classnames";
import ExpandCard from "../ExpandCard/index";
import "./styles.css";
const HorizontalAccordion = ({ elements }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);

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
    return i === elements.length - 1 || i === elements.length - 2;
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
          />
        ))}
      </ul>
    </div>
  );
};

export default HorizontalAccordion;
