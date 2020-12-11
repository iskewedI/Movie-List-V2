import React from 'react';
import { useDispatch } from 'react-redux';
import * as classNames from 'classnames';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { removeFromList } from './../../../store/toSee';
import Tooltip from '@material-ui/core/Tooltip';

const ExpandCard = ({
  data,
  setActive,
  index,
  active,
  focused,
  shiftLeft,
  isLast,
  getTransformToMove,
  getTransformDefault,
  getZIndex,
}) => {
  const dispatch = useDispatch();

  const deleteFromList = () => {
    dispatch(removeFromList(data.imdbID));
  };

  const getWidth = isActive => {
    let w = !isActive ? 'calc(20vw - 20px)' : '300';
    return w;
  };

  const styles = {
    container: {
      transform: (function () {
        return active
          ? 'scale(1.1) translate3d(0, 0, 0)'
          : 'scale(1) translate3d(0, 0, 0)';
      })(),
    },
    item: {
      transform: (function () {
        let transform = focused
          ? getTransformToMove(index, active)
          : getTransformDefault(index);
        return transform;
      })(),
      zIndex: getZIndex(index),
    },
    background: {
      background: 'url(' + data.Poster + ') no-repeat center center',
      backgroundSize: 'cover',
      height: '400px',
      width: getWidth(active),
    },
  };
  const classes = classNames({
    expandCard: true,
    isActive: active,
    isLast,
    shiftLeft,
  });
  return (
    <li className={classes} style={styles.item}>
      <button className='expandCard--deleteBtn' onClick={deleteFromList}>
        <Tooltip title='Remove' placement='top'>
          <BackspaceIcon />
        </Tooltip>
      </button>
      <h3 className='expandCard--content'>{data.Title}</h3>
      <div
        className='expandCard--image-container'
        onClick={() => setActive(index)}
        style={styles.container}
      >
        <div className='expandCard--image' style={styles.background}></div>
      </div>
      <div className='expandCard--name'>
        <h6>{data.Title}</h6>
      </div>
      <div className='expandCard--closeButton'>
        <a href='/#'>Back</a>
      </div>
    </li>
  );
};

export default ExpandCard;
