import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { OsuScore } from '@Types/score';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getToken({ req });

  if (token) {
    const { access_token } = token;
    const { id, key } = req.query;

    const valid_keys = [ 'id', 'username' ];
    if (typeof key === 'string' && !valid_keys.includes(key)) {
      res.status(400).end();
    }
    
    const user = await fetch(`https://osu.ppy.sh/api/v2/users/${ id }?key=${ key }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ access_token }`,
      },
    }).then(r => r.json());
    
    res.status(200).json(user);
  }
  else {
    res.status(401);
  }
  res.end();
};
