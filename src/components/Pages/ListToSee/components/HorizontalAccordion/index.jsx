import React, { useState } from 'react';
import * as classNames from 'classnames';
import ExpandCard from '../ExpandCard/index';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as Helper from './Helper';

import './styles.css';

const HorizontalAccordion = ({ elements, noContentMessage }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [movement, setMovement] = useState(0);

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
  const getZIndex = i => {
    return Helper.getInvertedDistanceToMiddle(elements, i);
  };

  const getMovement = () => {
    if (movement === 0) return '';

    return `translateX(${movement}vw)`;
  };

  const classes = classNames({
    focused: open,
  });

  if (elements.length <= 0) return <div className='nullMessage'>{noContentMessage}</div>;

  return (
    <div className={'customAccordion--menu-container ' + classes} onClick={lossFocus}>
      <div className='movementArrows'>
        <Button
          className='leftSideArrow'
          onClick={() => setMovement(movement + 25)}
          title='Left arrow'
        >
          <ArrowBackIcon className='directionArrow' />
        </Button>
        <Button
          className='rightSideArrow'
          onClick={() => setMovement(movement - 25)}
          title='Right arrow'
        >
          <ArrowForwardIcon className='directionArrow' />
        </Button>
      </div>

      <ul className='customAccordion menu' style={{ transform: getMovement() }}>
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
            getZIndex={getZIndex}
          />
        ))}
      </ul>
    </div>
  );
};

export default HorizontalAccordion;
