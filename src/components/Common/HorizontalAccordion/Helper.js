export const isLengthEven = (arr) => {
  return arr.length % 2 === 0;
};

export const getHalfIndexArray = (arr) => {
  const additionalSubstract = isLengthEven(arr) ? -1 : 0;
  return Math.floor(arr.length / 2) + additionalSubstract;
};

export const getDistanceToMiddle = (arr, n) => {
  let distance = 0;
  const halfIndex = getHalfIndexArray(arr);
  if (halfIndex > 0) {
    if (n < halfIndex) {
      distance = Math.abs(n - halfIndex);
    } else if (n > halfIndex) {
      let rigthHalf = halfIndex;
      if (isLengthEven(arr)) {
        rigthHalf += 1;
      }
      distance = n - rigthHalf;
    }
  }

  return distance;
};

export const getInvertedDistanceToMiddle = (arr, n) => {
  const halfIndex = getHalfIndexArray(arr);
  let distance = halfIndex;
  if (halfIndex > 0) {
    if (n < halfIndex) {
      distance = halfIndex - Math.abs(n - halfIndex);
    } else if (n > halfIndex) {
      let rightHalf = halfIndex;
      if (isLengthEven(arr)) {
        rightHalf += 1;
      }
      distance = halfIndex - (n - halfIndex);
    }
  }
  return distance;
};
