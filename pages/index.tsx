import type { NextPage, GetServerSideProps } from 'next';
import type { OsuScore } from '@Types/score';
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

interface Props {
  msg?: string;
}

const scoreFetcher = (url: string) => axios.get(url).then(r => r.data);

const MyProfile: NextPage<Props> = ({ msg }) => {  
  const { data: session } = useSession();
  const { activeScoreType } = useStateContext();
  const { data: scores, error, isLoading } = useSWR<OsuScore[]>(`/api/osu/scores/${ session?.osu?.id }/${ activeScoreType }`, scoreFetcher);
  
  if (session) {
    return (
      <Layout>
        <Head>
          <title>{`osu!pv • ${ session?.osu?.username }`}</title>
        </Head>
        <ProfileLayout playerStats={ <PlayerStats user={ session?.osu! } /> } msg={ msg }>
          {
            isLoading
            ? <Loader />
            : <ScoreList data={ scores! } />
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
