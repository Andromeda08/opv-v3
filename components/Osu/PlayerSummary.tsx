import { FC } from 'react';
import { PlayerStatType } from '@Types/osu';
import { Spinner } from '@Components/Spinner';
import {
  decimate,
  secondsToHnM
} from '@Utility/functions';
import { useStateContext } from '@Contexts/StateContext';

const Marker: FC<{ bg: string }> = ({ bg }) => (
  <div className={`marker ${ bg }`} />
);

const PlayerStat: FC<{
  i: number;
  stat: PlayerStatType;
}> = ({ i, stat }) => {
  const marker_colors = [
    'bg-red-400',
    'bg-rose-400',
    'bg-pink-400',
    'bg-fuchsia-400',
    'bg-purple-400',
    'bg-violet-400',
    'bg-indigo-400',
    'bg-blue-400',
    'bg-sky-400',
    'bg-cyan-400'
  ];

  return (
    <div className='osu_player-stat'>
      <Marker bg={ marker_colors[i] } />
      <p className='value'>{ stat.value }</p>
      <p className='name'>{ stat.name }</p>
    </div>
  );
};

export const PlayerSummary : FC<{
  player: any;
}> = ({ player }) => {
  const { loading } = useStateContext();
  const player_stats: PlayerStatType[] = [
    {
      value: decimate(player.pp_raw, 0),
      name: 'pp',
    },
    {
      value: (decimate(player.accuracy) + '%'),
      name: 'accuracy'
    },
    {
      value: ('#' + player.pp_rank),
      name: 'global ranking'
    },
    {
      value: player.playcount,
      name: 'play count'
    },
    {
      value: secondsToHnM(player.total_seconds_played),
      name: 'total play time'
    }
  ];

  return (
    <div className='osu_player-summary'>
      {
        loading 
        ? (
        <div className='flex items-center justify-center p-4'>
          <Spinner />
        </div>
        )
        : ( <>
        <div className='osu_player-header'>
          <div className='osu_player-header-details'>
            <div className='osu_player-avatar'>
              <img 
                src={`https://a.ppy.sh/${ player.user_id }`}
                alt='user profile picture'
              />
            </div>
            <div className='osu_player-name'>
              <h3>{ player.username }</h3>
            </div>
          </div>
          <div className='osu_player-header-bg'>
            <img src="flower.jpg" alt="" />
          </div>
        </div>
        <div className='osu_player-details'>
          {
            player_stats.map((e: PlayerStatType, idx: number) => (
              <PlayerStat
                key={ idx }
                i={ idx }
                stat={ e }
              />
            ))
          }
        </div>
        </>)
      }
    </div>
  );
}
