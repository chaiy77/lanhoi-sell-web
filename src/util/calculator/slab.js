const sheetWidth = 0.3;

const getSlabs = (A, B) => {
  const sheets = Math.floor(A / sheetWidth);
  return sheets;
};

export { getSlabs };
