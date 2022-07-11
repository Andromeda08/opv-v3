import { default_user } from "./constants";

export const secondsToHnM = (t: number) => {
  const hours = Math.floor(t/3600);
  const minutes = Math.round(Math.floor((t/60 - hours*60))).toFixed(0);
  return `${hours}h ${minutes}m`;
};

export const shorten = (s: string) => {
  if (s.length >= 16) return s.substring(0, 24) + '...';
  else return s;
};

export const decimate = (n: number, d: number = 2) => {
  return (Math.round(n * 100) / 100).toFixed(d);
};

export const osuFetch = async (key: string, username: string = default_user) => {
  const user = await fetch(
    `https://osu.ppy.sh/api/get_user?u=${username}&k=${key}`
  ).then((res) => res.json());

  const scores = await fetch(
    `https://osu.ppy.sh/api/get_user_best?u=${username}&limit=10&k=${key}`
  ).then((res) => res.json());

  const promises = scores.map(async (s: any) => {
    const bm = await fetch(
      `https://osu.ppy.sh/api/get_beatmaps?b=${s.beatmap_id}&k=${key}`
    ).then((res) => res.json());
    return bm;
  });

  const beatmaps = await Promise.all(promises).then((arr) => arr.flat());

  if ( !user || !scores || !beatmaps ) {
    throw new Error('Incomplete osu! api response');
  }

  return {
    user, scores, beatmaps
  };
};