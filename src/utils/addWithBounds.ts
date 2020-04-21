export default (number: number, bound: number) => {
  let returnNumber = number + 1;

  if (returnNumber > bound) {
    returnNumber = 0;
  }

  return returnNumber;
};
