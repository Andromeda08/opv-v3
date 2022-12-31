import type { NextPage, GetServerSideProps } from 'next';
import type { OsuScore } from '@Types/score';
import { getSession, useSession } from 'next-auth/react';
import useSWR from 'swr';
import axios from 'axios';
import { Loader } from '@Components/Spinner';
import PlayerStats from '@Components/Player';
import ScoreList from '@Components/Scores/ScoreList';
import ProfileLayout from '@Components/ProfileLayout';
import { useStateContext } from '@Contexts/StateContext';
import { Layout } from '@Components/Layout';
import Head from 'next/head';
import BeatmapList from '@Components/Beatmaps/BeatmapList';

const fetcher = (url: string) => axios.get(url).then(r => r.data);

const UserProfile: NextPage<{ userId: number, msg: string }> = ({ userId, msg }) => {
  const { activeTab } = useStateContext();
  const { data: player, error: e1, isLoading: userIsLoading } = useSWR(`/api/osu/users/${ userId }`, fetcher);

  return (
    <Layout>
      <Head>
        <title>{`osu!pv${player ? ` • ${ player?.username }` : ''}`}</title>
      </Head>
      <ProfileLayout playerStats={ userIsLoading ? <Loader /> : <PlayerStats user={ player } /> } msg={ msg }>
        {
          (activeTab !== 'beatmaps')
          ? userIsLoading
            ? <Loader />
            : <ScoreList userId={ player.id } />
          : userIsLoading
            ? <Loader />
            : <BeatmapList
                userId={ userId }
                counts={{
                  graveyard: player.graveyard_beatmapset_count,
                  loved: player.loved_beatmapset_count,
                  pending: player.pending_beatmapset_count,
                  ranked: player.ranked_beatmapset_count,
                }}
              />
        }
      </ProfileLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, msg } = context.query;
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    }
  } 

  if (typeof id !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/me'
      },
      props: {},
    };
  };

  return {
    props: {
      userId: id,
      msg: (msg) ? msg : null
    },
  };
};

export default UserProfile;
