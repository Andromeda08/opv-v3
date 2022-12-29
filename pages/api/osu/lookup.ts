import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
  const token = await getToken({ req });

  if (token) {
    const { access_token } = token;
    const { username } = req.query;
    
    const user = await fetch(`https://osu.ppy.sh/api/v2/users/${username}?key=username`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ access_token }`,
      },
    }).then(r => r.json());

    if (user.id === undefined) {
      res.status(200).redirect(`/?msg=User not found!`);
    }
    
    res.status(200).redirect(`/user/${ user.id }`);
  }
  else {
    res.status(401);
  }

  res.end();
};
