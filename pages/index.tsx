// @ts-nocheck
import { FC, useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { osuFetch } from '@Utility/functions';

import { SearchBar } from '@Components/Osu/SearchBar';
import { ScoreList } from '@Components/Osu/ScoreList';
import { PlayerSummary } from '@Components/Osu/PlayerSummary';
import { useStateContext } from '@Contexts/StateContext';
import { useThemeContext } from '@Contexts/ThemeContext';
import { ThemeSwitcher } from '@Components/Osu/ThemeSwitcher';

const Osu: FC<{
  _user: any;
  _scores: any;
  _beatmaps: any;
}> = ({ _user, _scores, _beatmaps }) => {
  const { theme } = useThemeContext();
  const { setLoading } = useStateContext();
  
  const [ user, setUser ] = useState(_user);
  const [ scores, setScores ] = useState(_scores);
  const [ beatmaps, setBeatmaps ] = useState(_beatmaps);

  const fetchPlayer = async (username: string) => {
    const { user, scores, beatmaps } = await osuFetch(process.env.NEXT_PUBLIC_API_KEY, username);

    if (!(user.length === 0)) {
      setUser(user[0]);
      setScores(scores);
      setBeatmaps(beatmaps);
      setLoading(false);
      return;
    }
    else {
      fetchPlayer("-Andromeda-");
    }
  }

  const submitSearch = (event: any) => {
    event.preventDefault();
    if (event.target.username.value) {
      setLoading(true);
      fetchPlayer(event.target.username.value);
    }
  }

  return (
    <div className={(theme === 'dark') ? 'dark' : ''}>
      <div className='osu_page-layout'>
        <Head>
          <title>osu!pv • { user.username }</title>
        </Head>
        <div className='osu_left-col'>
          <SearchBar onSubmit={ submitSearch } username={ user.username } />
          <PlayerSummary player={ user }/>
          <div className='madeby'>
            <Link
              href='https://osu.ppy.sh/users/6428418'
              target='_blank'
            >
                <a>made by -Andromeda-</a>
            </Link>
          </div>
        </div>
        <ScoreList scores={ scores } beatmaps={ beatmaps } />
      </div>
      <ThemeSwitcher />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user, scores, beatmaps } = await osuFetch(process.env.NEXT_PUBLIC_API_KEY);

  res.setHeader(
    'Cache-Control',
    'public, max-age=120'
  )

  return {
    props: {
      _user: user[0],
      _scores: scores,
      _beatmaps: beatmaps
    }
  };
};

export default Osu;
