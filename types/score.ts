export type ScoreType = 'best' | 'firsts' | 'recent' | 'beatmaps';

export type OsuUserCompact = {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string;
  pm_friends_only: boolean;
  profile_colour: string | null;
  username: string;
};

export type OsuScore = {
  accuracy: number;
  best_id: number;
  created_at: string;
  id: number;
  max_combo: number;
  mode: string;
  mode_int: number;
  mods: string[];
  passed: boolean;
  perfect: boolean;
  pp: number;
  rank: string;
  replay: boolean;
  score: number;
  statistics: {
    count_100: number;
    count_300: number;
    count_50: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
  };
  type: string;
  user_id: number;
  current_user_attributes: {
    pin: {
      is_pinned: boolean;
      score_id: number;
      score_type: string;
    };
  };
  beatmap: OsuBeatmap;
  beatmapset: OsuBeatmapSet;
  user: OsuUserCompact;
  weight: {
    percentage: number;
    pp: number;
  };
};

export type OsuBeatmap = {
  beatmapset_id: number;
  difficulty_rating: number;
  id: number;
  mode: string;
  status: string;
  total_length: number;
  user_id: number;
  version: string;
  accuracy: number;
  ar: number;
  bpm: number;
  conver: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at: string | null;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: string;
  mode_int: number;
  passcount: number;
  playcount: number;
  ranked: number;
  url: string;
};

export type OsuBeatmapSet = {
  artist: string;
  artist_unicode: string | null;
  covers: {
    cover: string;
    card: string;
    list: string;
    slimcover: string;
  };
  creator: string;
  favourite_count: number;
  hype: number | null;
  id: number;
  nsfw: boolean;
  offset: number;
  play_count: number;
  preview_url: string;
  source: string | null;
  spotlight: boolean;
  status: string;
  title: string;
  title_unicode: string | null;
  track_id: any | null;
  user_id: number;
  video: boolean;
};