import { OsuBeatmapSet } from './score';

export type UserBeatmapsRes = {
  graveyard: OsuBeatmapSet[],
  loved: OsuBeatmapSet[],
  pending: OsuBeatmapSet[],
  ranked: OsuBeatmapSet[],
};