import { OsuBeatmapSet } from '@Types/score';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const base_url: string = 'https://osu.ppy.sh/api/v2'
const headers = (token: string) => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ token }`,
    },
  };
}

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
  const token = await getToken({ req });
  const { userId, a, b, c, d } = req.query;

  if (token && token.access_token) {
    const { access_token } = token;
    var limit = a ?? 10;
    const graveyard: OsuBeatmapSet[] = await fetch(`${base_url}/users/${userId}/beatmapsets/graveyard?limit=${limit}`, headers(access_token)).then(r => r.json());
    limit = b ?? 10;
    const loved: OsuBeatmapSet[] = await fetch(`${base_url}/users/${userId}/beatmapsets/loved?limit=${limit}`, headers(access_token)).then(r => r.json());
    limit = c ?? 10;
    const pending: OsuBeatmapSet[] = await fetch(`${base_url}/users/${userId}/beatmapsets/pending?limit=${limit}`, headers(access_token)).then(r => r.json());
    limit = d ?? 10;
    const ranked: OsuBeatmapSet[] = await fetch(`${base_url}/users/${userId}/beatmapsets/ranked?limit=${limit}`, headers(access_token)).then(r => r.json());

    res.status(200).json({
      graveyard: graveyard,
      loved: loved,
      pending: pending,
      ranked: ranked
    });
  }
  else {
    res.status(401);
  }

  res.end();
};
