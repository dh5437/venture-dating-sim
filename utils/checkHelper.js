const checkIsValidCoordinate = (rowIndex = -1, columnIndex = -1) => {
  const isValidRowIndex = +rowIndex >= 0 && +rowIndex <= 9;
  const isValidColumnIndex = +columnIndex >= 0 && +columnIndex <= 9;

  return isValidRowIndex && isValidColumnIndex;
};

module.export = {
  checkIsValidCoordinate,
};
