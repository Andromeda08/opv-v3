import NextAuth, { AuthOptions } from 'next-auth';
import OsuProvider from 'next-auth/providers/osu';

export const authOptions: AuthOptions = {
  providers: [
    OsuProvider({
      clientId: process.env.OSU_ID!,
      clientSecret: process.env.OSU_SECRET!,
      authorization: {
        params: {
          scope: 'identify public'
        }
      },
      profile(profile) {
        return {
          id: profile.id,
          username: profile.username,
          avatar_url: profile.avatar_url,
          cover: profile.cover,
          country: profile.country,
          statistics: profile.statistics
        }
      },
    }),
  ],
};

export default NextAuth({
  ...authOptions,
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      const t = {
        osu: {
          id: profile?.id,
          username: profile?.username,
          avatar_url: profile?.avatar_url,
          cover: profile?.cover,
          country: profile?.country,
          statistics: profile?.statistics,
        },
        access_token: account?.access_token,
        ...token
      };
      return t;
    },
    session: async ({ session, token }) => {
      const { osu, access_token } = token;
      const user = {
        id: osu.id,
        name: osu.username,
        image: osu.avatar_url,
        email: null,
      };

      const s = {
        access_token,
        osu,
        user,
        ...session
      };
      
      return s;
    }
  },
});
