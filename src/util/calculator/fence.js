const dist = 2.5;
const sheetWidth = 0.25;

const getFenceSheets = (high, long, beam) => {
  let sheets = Math.floor(high / sheetWidth) * Math.ceil(long / dist);
  sheets = beam ? sheets - 1 : sheets;

  return sheets;
};

const getFenceColumns = (long, join) => {
  let columns = Math.ceil(long / dist) + 1;
  columns = join ? columns - 1 : columns;
  return columns;
};

export { getFenceSheets, getFenceColumns };
