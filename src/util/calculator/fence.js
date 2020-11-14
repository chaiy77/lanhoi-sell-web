const dist = 2.5;
const sheetWidth = 0.3;

const getFenceSheets = (high, long) => {
  const sheets = Math.floor(high / sheetWidth) * Math.ceil(long / dist);
  return sheets;
};

const getFenceColumns = long => {
  const columns = Math.ceil(long / dist) + 1;
  return columns;
};

export { getFenceSheets, getFenceColumns };
