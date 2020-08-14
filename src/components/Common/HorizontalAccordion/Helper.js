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
