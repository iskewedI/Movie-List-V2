import React, { useState } from 'react';
import * as classNames from 'classnames';
import ExpandCard from '../ExpandCard/index';
import * as Helper from './Helper';
import './styles.css';
const HorizontalAccordion = ({ elements, type }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = index => {
    setActiveIndex(index);
    setOpen(true);
  };
  const lossFocus = e => {
    e.preventDefault();
    if (e.target.className !== 'expandCard--image') {
      setActiveIndex(null);
      setOpen(false);
    }
  };

  const getTransformToMove = (i, isActive) => {
    let countX;
    let direction;
    if (isActive) {
      direction = Helper.getActiveDirectionToMove(elements, i);
      countX = 10 * Helper.getActiveCountToMove(elements, i);
    } else {
      direction = Helper.getDeactiveDirectionToMove(i, activeIndex);
      countX = 20 * Helper.getDeactiveCountToMove(elements, i);
    }
    return `translate3d(${direction}${countX}%, 0, 0)`;
  };
  const getTransformDefault = i => {
    let transform = '';
    let distanceToMiddle = Helper.getDistanceToMiddle(elements, i);
    if (distanceToMiddle !== 0) {
      let direction = Helper.getDefaultDirectionToMove(elements, i);
      let distanceToMiddle = Helper.getDistanceToMiddle(elements, i);
      let count = 30 * distanceToMiddle;
      transform = `translate3d(${direction}${count}%, 0, 0)`;
    }
    return transform;
  };
  const getZIndex = i => {
    return Helper.getInvertedDistanceToMiddle(elements, i);
  };
  const classes = classNames({
    focused: open,
  });

  return (
    <div className={'customAccordion--menu-container ' + classes} onClick={lossFocus}>
      {elements.length <= 0 && (
        <div className='nullMessage'>There's no {type.toLowerCase()} in the list</div>
      )}
      <ul className='customAccordion menu'>
        {elements.map((m, i) => (
          <ExpandCard
            key={i}
            data={m}
            setActive={handleClick}
            index={i}
            active={i === activeIndex}
            focused={open}
            shiftLeft={i < activeIndex}
            isLast={i === elements.length - 1}
            isFirst={i === 0}
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
