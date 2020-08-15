export const isLengthEven = (arr) => {
  return arr.length % 2 === 0;
};

export const getHalfIndexArray = (arr) => {
  const additionalSubstract = isLengthEven(arr) ? -1 : 0;
  return Math.floor(arr.length / 2) + additionalSubstract;
};

export const getDistanceToMiddle = (arr, i) => {
  let distance = 0;
  const halfIndex = getHalfIndexArray(arr);
  if (halfIndex > 0) {
    if (i < halfIndex) {
      distance = Math.abs(i - halfIndex);
    } else if (i > halfIndex) {
      let rigthHalf = halfIndex;
      if (isLengthEven(arr)) {
        rigthHalf += 1;
      }
      distance = i - rigthHalf;
    }
  }
  return distance;
};

export const getInvertedDistanceToMiddle = (arr, i) => {
  const halfIndex = getHalfIndexArray(arr);
  let distance = halfIndex;
  if (halfIndex > 0) {
    if (i < halfIndex) {
      distance = halfIndex - Math.abs(i - halfIndex);
    } else if (i > halfIndex) {
      let rightHalf = halfIndex;
      if (isLengthEven(arr)) {
        rightHalf += 1;
      }
      if (i > rightHalf) {
        distance = arr.length - i - 1;
      }
    }
  }
  return distance;
};

export const getActiveDirectionToMove = (arr, i) => {
  let direction = "";
  let halfIndex = getHalfIndexArray(arr);
  direction = i <= halfIndex ? "" : "-";

  return direction;
};
export const getDeactiveDirectionToMove = (i, activeIndex) => {
  return i < activeIndex ? "-" : "";
};
export const getDefaultDirectionToMove = (arr, i) => {
  let halfIndex = getHalfIndexArray(arr);
  return i <= halfIndex ? "" : "-";
};

export const getActiveCountToMove = (arr, i) => {
  let countX = 0;
  let counts = [2, 2, 2, 1.5, 1.5, 1.5, 1, 1, 1];
  const distanceToMiddle = getDistanceToMiddle(arr, i);
  if (distanceToMiddle !== 0) {
    countX = counts[distanceToMiddle];
  }
  return countX;
};

export const getDeactiveCountToMove = (arr, i) => {
  let counts = [1.7, 1.7, 1.7, 1, 1, 1, 0.7, 0.7, 0.7];
  let countX = counts[getDistanceToMiddle(arr, i)];
  return countX;
};
