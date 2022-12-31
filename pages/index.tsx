import type { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useStateContext } from '@Contexts/StateContext';
import { Loader } from '@Components/Spinner';
import PlayerStats from '@Components/Player';
import ScoreList from '@Components/Scores/ScoreList';
import ProfileLayout from '@Components/ProfileLayout';
import LoginPage from '@Components/LoginPage';
import { Layout } from '@Components/Layout';
import Head from 'next/head';
import BeatmapList from '@Components/Beatmaps/BeatmapList';

interface Props {
  msg?: string;
}

const fetcher = (url: string) => axios.get(url).then(r => r.data);

const MyProfile: NextPage<Props> = ({ msg }) => {  
  const { data: session } = useSession();
  const { activeTab } = useStateContext();
  const { data: player, error, isLoading: isLoading } = useSWR(`/api/osu/users/${ session?.osu?.id }`, fetcher);

  if (session) {
    return (
      <Layout>
        <Head>
          <title>{`osu!pv • ${ session?.osu?.username }`}</title>
        </Head>
        <ProfileLayout playerStats={ <PlayerStats user={ session?.osu! } /> } msg={ msg }>
          {
            (activeTab !== 'beatmaps')
            ? isLoading
              ? <Loader />
              : <ScoreList userId={ player.id } />
            : isLoading
              ? <Loader />
              : <BeatmapList
                  userId={ player.id }
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

  return (
    <Layout>
      <Head>
        <title>osu!pv</title>
      </Head>
      <LoginPage />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { msg } = context.query;

  return {
    props: {
      msg: (msg) ? msg : null
    },
  };
};

export default MyProfile;
