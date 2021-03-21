<<<<<<< HEAD
const dist = 2.5;
const sheetWidth = 0.3;

const getWallSheets = (high, long) => {
  const sheets = Math.floor(high / sheetWidth) * Math.ceil(long / dist);
  return sheets;
};

const getWallColumns = long => {
  const columns = Math.ceil(long / dist) + 1;

  return columns;
};

export { getWallSheets, getWallColumns };
=======
const dist = 2.5;
const sheetWidth = 0.3;

const getWallSheets = (high, long) => {
  const sheets = Math.floor(high / sheetWidth) * Math.ceil(long / dist);
  return sheets;
};

const getWallColumns = long => {
  const columns = Math.ceil(long / dist) + 1;

  return columns;
};

export { getWallSheets, getWallColumns };
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
