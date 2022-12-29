export const secondsToHnM = (t: number) => {
  const hours = Math.floor(t/3600);
  const minutes = Math.round(Math.floor((t/60 - hours*60))).toFixed(0);
  return `${hours}h ${minutes}m`;
};

export const shorten = (s: string, i: number = 16) => {
  if (s.length >= i) return s.substring(0, i) + '...';
  else return s;
};

export const decimate = (n: number, d: number = 2) => {
  return (Math.round(n * 100) / 100).toFixed(d);
};
