import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { OsuScore } from '@Types/score';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<OsuScore[]>
) => {
  const token = await getToken({ req });

  if (token) {
    const { access_token } = token;
    
    const valid_types = [ 'best', 'firsts', 'recent' ];
    const { id, type } = req.query;

    if (typeof type === 'string' && !valid_types.includes(type)) {
      res.status(400).end();
    }

    const scores: OsuScore[] = await fetch(`https://osu.ppy.sh/api/v2/users/${id}/scores/${type}?limit=15`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ access_token }`,
      },
    }).then(r => r.json());
    
    res.status(200).json(scores);
  }
  else {
    res.status(401);
  }
  res.end();
};
