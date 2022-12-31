export interface OsuUser {
  id: string,
  avatar_url?: string,
  cover?: {
    custom_url: string | null,
    url: string,
    id: string | null,
  },
  username?: string,
  country?: {
    code: string,
    name: string,
  },
  statistics: OsuStatistics,
  graveyard_beatmapset_count: number,
  loved_beatmapset_count: number,
  pending_beatmapset_count: number,
  ranked_beatmapset_count: number,
};

export interface OsuLevel {
  current: number,
  progress: number,
};

export interface OsuGradeCounts {
  ss: number,
  ssh: number,
  s: number,
  sh: number,
  a: number,
};

export interface OsuStatistics {
  level: OsuLevel,
  global_rank: number,
  pp: number,
  ranked_score: number,
  hit_accuracy: number,
  play_count: number,
  play_time: number,
  total_score: number,
  total_hits: number,
  maximum_combo: number,
  grade_counts: OsuGradeCounts,
  country_rank: number,
};