import * as Helper from "../../../../components/Common/HorizontalAccordion/Helper";

describe("helperSlice", () => {
  let evenArray;
  let oddArray;
  beforeEach(() => {
    evenArray = [0, 1, 2, 3];
    oddArray = [0, 1, 2, 3, 4];
  });
  describe("isLengthEven method", () => {
    it("should return true if method has even length", () => {
      const result = Helper.isLengthEven(evenArray);

      expect(result).toBe(true);
    });
    it("should return false if method has odd length", () => {
      oddArray = [1, 2, 3];

      const result = Helper.isLengthEven(oddArray);

      expect(result).toBe(false);
    });
  });
  describe("getHalfIndexArray method", () => {
    it("should return the index of the half number in the array if it's even", () => {
      const result = Helper.getHalfIndexArray(evenArray);

      expect(result).toBe(1);
    });
    it("should return the index of the half number in the array if it's odd", () => {
      const result = Helper.getHalfIndexArray(oddArray);

      expect(result).toBe(2);
    });
    it("should not throw an error and return 0 if the array is empty", () => {
      let emptyArray = [0];

      const result = Helper.getHalfIndexArray(emptyArray);

      expect(result).toBe(0);
    });
  });
  describe("getDistanceToMiddle method", () => {
    it("should return the distance between this elements and the middle in the array if it's even", () => {
      const distanceFromFirst = Helper.getDistanceToMiddle(evenArray, 0);
      const distanceFromSecond = Helper.getDistanceToMiddle(evenArray, 1);
      const distanceFromBeforeLast = Helper.getDistanceToMiddle(evenArray, 2);
      const distanceFromLast = Helper.getDistanceToMiddle(evenArray, 3);

      expect(distanceFromFirst).toBe(1);
      expect(distanceFromSecond).toBe(0);
      expect(distanceFromBeforeLast).toBe(0);
      expect(distanceFromLast).toBe(1);
    });
    it("should return the distance between this elements and the middle in the EXTENDED array if it's even", () => {
      const extendedArr = [...evenArray, 4, 5]; //0 1 2 3

      const distanceFromFirst = Helper.getDistanceToMiddle(extendedArr, 0);
      const distanceFromSecond = Helper.getDistanceToMiddle(extendedArr, 1);
      const distanceFromThird = Helper.getDistanceToMiddle(extendedArr, 2);
      const distanceFromFourth = Helper.getDistanceToMiddle(extendedArr, 3);
      const distanceFromBeforeLast = Helper.getDistanceToMiddle(extendedArr, 4);
      const distanceFromLast = Helper.getDistanceToMiddle(extendedArr, 5);

      expect(distanceFromFirst).toBe(2);
      expect(distanceFromSecond).toBe(1);
      expect(distanceFromThird).toBe(0);
      expect(distanceFromFourth).toBe(0);
      expect(distanceFromBeforeLast).toBe(1);
      expect(distanceFromLast).toBe(2);
    });
    it("should return the distance between this elements and the middle in the array if it's odd", () => {
      const distanceFromFirst = Helper.getDistanceToMiddle(oddArray, 0);
      const distanceFromSecond = Helper.getDistanceToMiddle(oddArray, 1);
      const distanceFromThird = Helper.getDistanceToMiddle(oddArray, 2);
      const distanceFromBeforeLast = Helper.getDistanceToMiddle(oddArray, 3);
      const distanceFromLast = Helper.getDistanceToMiddle(oddArray, 4);

      expect(distanceFromFirst).toBe(2);
      expect(distanceFromSecond).toBe(1);
      expect(distanceFromThird).toBe(0);
      expect(distanceFromBeforeLast).toBe(1);
      expect(distanceFromLast).toBe(2);
    });
    it("should return 0 each time if the array has only two elements", () => {
      const arr = [0, 1];

      const distanceFromFirst = Helper.getDistanceToMiddle(arr, 0);
      const distanceFromSecond = Helper.getDistanceToMiddle(arr, 1);

      expect(distanceFromFirst).toBe(0);
      expect(distanceFromSecond).toBe(0);
    });
  });
  describe("getInvertedDistanceToMiddle method", () => {
    it("should return the inverted distance to middle between elements and middle if the array is even", () => {
      let extendedArr = [...evenArray, 4, 5]; //0 1 2 3 4 5
      const distanceFirst = Helper.getInvertedDistanceToMiddle(extendedArr, 0);
      const distanceSecond = Helper.getInvertedDistanceToMiddle(extendedArr, 1);
      const distanceThird = Helper.getInvertedDistanceToMiddle(extendedArr, 2);
      const distanceFourth = Helper.getInvertedDistanceToMiddle(extendedArr, 3);
      const distanceBefLast = Helper.getInvertedDistanceToMiddle(
        extendedArr,
        4
      );
      const distanceLast = Helper.getInvertedDistanceToMiddle(extendedArr, 5);

      expect(distanceFirst).toBe(0);
      expect(distanceSecond).toBe(1);
      expect(distanceThird).toBe(2);
      expect(distanceFourth).toBe(2);
      expect(distanceBefLast).toBe(1);
      expect(distanceLast).toBe(0);
    });
    it("should return the inverted distance to middle between elements and middle if the array is odd", () => {
      let extendedArr = [...evenArray, 4, 5, 6]; //0 1 2 3 4 5 6
      const distanceFirst = Helper.getInvertedDistanceToMiddle(extendedArr, 0);
      const distanceSecond = Helper.getInvertedDistanceToMiddle(extendedArr, 1);
      const distanceThird = Helper.getInvertedDistanceToMiddle(extendedArr, 2);
      const distanceFourth = Helper.getInvertedDistanceToMiddle(extendedArr, 3);
      const distanceFifth = Helper.getInvertedDistanceToMiddle(extendedArr, 4);
      const distanceBefLast = Helper.getInvertedDistanceToMiddle(
        extendedArr,
        5
      );
      const distanceLast = Helper.getInvertedDistanceToMiddle(extendedArr, 6);

      expect(distanceFirst).toBe(0);
      expect(distanceSecond).toBe(1);
      expect(distanceThird).toBe(2);
      expect(distanceFourth).toBe(3);
      expect(distanceFifth).toBe(2);
      expect(distanceBefLast).toBe(1);
      expect(distanceLast).toBe(0);
    });
    it("should return 0 each time if the array has only two elements", () => {
      const arr = [0, 1];

      const distanceFirst = Helper.getInvertedDistanceToMiddle(arr, 0);
      const distanceSecond = Helper.getInvertedDistanceToMiddle(arr, 1);

      expect(distanceFirst).toBe(0);
      expect(distanceSecond).toBe(0);
    });
  });
  describe("getActiveDirectionToMove method", () => {
    it("should return positive/empty string if index is less than half", () => {
      const direction = Helper.getActiveDirectionToMove(oddArray, 1);

      expect(direction).toBe("");
    });
    it("should return a positive/empty string symbol in string if index is equal to half", () => {
      const direction = Helper.getActiveDirectionToMove(oddArray, 2);

      expect(direction).toBe("");
    });
    it("should return a negative symbol in string if index is greater than half", () => {
      const direction = Helper.getActiveDirectionToMove(oddArray, 4);

      expect(direction).toBe("-");
    });
  });
  describe("getDeactiveDirectionToMove method", () => {
    it("should return a positive/empty string if index is greater than active index", () => {
      const direction = Helper.getDeactiveDirectionToMove(4, 2);

      expect(direction).toBe("");
    });
    it("should return a negative symbol in string if index is lesser than active index", () => {
      const direction = Helper.getDeactiveDirectionToMove(2, 4);

      expect(direction).toBe("-");
    });
  });
  describe("getDefaultDirectionToMove method", () => {
    it("should return a positive/empty string if index is less than half index", () => {
      const direction = Helper.getDefaultDirectionToMove(oddArray, 1);

      expect(direction).toBe("");
    });
    it("should return a positive/empty string if index is equal than half index", () => {
      const direction = Helper.getDefaultDirectionToMove(oddArray, 2);

      expect(direction).toBe("");
    });
    it("should return a negative symbol in string if index is greater than active index", () => {
      const direction = Helper.getDefaultDirectionToMove(oddArray, 4);

      expect(direction).toBe("-");
    });
  });
  describe("getActiveCountToMove method", () => {
    it("should return 2 if the distance is less than 3", () => {
      const extendedArr = [...oddArray, 5, 6]; // 0 1 2 3 4 5 6

      const direction = Helper.getActiveCountToMove(extendedArr, 2);

      expect(direction).toBe(2);
    });
    it("should return 1.5 if the distance is >= 3 and < 6", () => {
      const extendedArr = [...oddArray, 5, 6]; // 0 1 2 3 4 5 6

      const direction = Helper.getActiveCountToMove(extendedArr, 0);

      expect(direction).toBe(1.5);
    });
    it("should return 1 if the distance is >= 6", () => {
      const extendedArr = [...oddArray, 5, 6, 7, 8, 9, 10, 11, 12]; // 0 1 2 3 4 5 6 7 8 9 10 11 12

      const direction = Helper.getActiveCountToMove(extendedArr, 0);

      expect(direction).toBe(1);
    });
  });
  describe("getDeactiveCountToMove method", () => {
    it("should return 1.7 if the distance is less than 3", () => {
      const extendedArr = [...oddArray, 5, 6]; // 0 1 2 3 4 5 6

      const direction = Helper.getDeactiveCountToMove(extendedArr, 2);

      expect(direction).toBe(1.7);
    });
    it("should return 1 if the distance is >= 3 and < 6", () => {
      const extendedArr = [...oddArray, 5, 6]; // 0 1 2 3 4 5 6

      const direction = Helper.getDeactiveCountToMove(extendedArr, 0);

      expect(direction).toBe(1);
    });
    it("should return 0.7 if the distance is >= 6", () => {
      const extendedArr = [...oddArray, 5, 6, 7, 8, 9, 10, 11, 12]; // 0 1 2 3 4 5 6 7 8 9 10 11 12

      const direction = Helper.getDeactiveCountToMove(extendedArr, 0);

      expect(direction).toBe(0.7);
    });
  });
});
