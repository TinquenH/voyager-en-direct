const MAX_AU = 200;

export const compressDistance = (au) => {
  return Math.log1p(au) / Math.log1p(MAX_AU);
};
