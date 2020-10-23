const _wide = 0.76;

const rectangle = (A, B) => {
  const _sheets = Math.ceil(A / _wide);
  const result = [{ long: B, total: _sheets }];
  return result;
};

const rTriangle = (A, B) => {
  let _sheets = Math.ceil(A / _wide);
  let _h = B;
  let result = [];
  for (let i = 1; i <= _sheets; i++) {
    result.push({ long: (Math.round(_h * 10) / 10).toFixed(2), total: 1 });
    _h = _h * (1 - _wide / A) + 0.1;
  }
  return result;
};

const getMetalsheets = (type, A, B, C = 0) => {
  console.log('calculate roof type', type);
  if (type === 'type A') {
    return rectangle(A, B);
    // return rTriangle(A, B);
  } else if (type === 'type B') {
    return 20;
  } else if (type === 'type C') {
    return 20;
  } else if (type === 'type D') {
    return rTriangle(A, B);
  } else if (type === 'type E') {
    return 20;
  } else if (type === 'type F') {
    return 20;
  } else if (type === 'type G') {
    return 20;
  } else {
    return 0;
  }
};

const getScrews = (type, A, B, C, pDist = 0) => {
  if (type === 'type A') {
    const _sheets = Math.ceil(A / _wide);
    let _s = Math.round(A / pDist) * (_sheets + 1);
    return _s;
  } else if (type === 'type B') {
    return 0;
  } else if (type === 'type C') {
    return 0;
  } else if (type === 'type D') {
    return 0;
  } else if (type === 'type E') {
    return 0;
  } else if (type === 'type F') {
    return 0;
  } else if (type === 'type G') {
    return 0;
  } else {
    return 0;
  }
};

export { getMetalsheets, getScrews };
