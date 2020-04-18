export default (number: number, bound: number) => {
  let returnNumber = number + 1;

  if (number >= bound) {
    returnNumber = 0;
  }

  return returnNumber;
};
