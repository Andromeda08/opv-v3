import type { FC } from 'react';
import type { OsuUser } from '@Types/user';
import { secondsToHnM } from '@Utility/functions';

export interface PlayerStatsProps {
  user: OsuUser;
};

const PlayerStats: FC<PlayerStatsProps> = ({ user }) => {
  interface Statistic { value: any, name: string };

  const { statistics, username, avatar_url, cover, country } = user;

  const Marker: FC<{ color: string }> = ({ color }) => <div className={`marker ${ color }`} />;

  const stats: Statistic[] = [
    {
      value: Math.round(statistics.pp),
      name: 'pp',
    },
    {
      value: `${statistics.hit_accuracy.toFixed(2)}%`,
      name: 'accuracy',
    },
    {
      value: `#${statistics.global_rank}`,
      name: 'global rank'
    },
    {
      value: `#${statistics.country_rank}`,
      name: 'country rank'
    },
    {
      value: statistics.play_count,
      name: 'play count',
    },
    {
      value: secondsToHnM(statistics.play_time),
      name: 'total play time',
    }
  ];

  const StatItem: FC<{ data: Statistic, i?: number }> = ({ data, i }) => {
    const colors: string[] = [
      'bg-mocha-rosewater',
      'bg-mocha-flamingo',
      'bg-mocha-pink',
      'bg-mocha-mauve',
      'bg-mocha-red',
      'bg-mocha-maroon',
      'bg-mocha-peach',
      'bg-mocha-yellow',
      'bg-mocha-green',
      'bg-mocha-teal',
      'bg-mocha-sky',
      'bg-mocha-sapphire',
      'bg-mocha-blue',
      'bg-mocha-lavender',
    ];

    return (
      <div className='osu_player-stat'>
        <Marker color={ colors[((i ?? 0) + 3) % colors.length] } />
        <p className='value'>{ data.value }</p>
        <p className='name'>{ data.name }</p>
      </div>
    );
  };

  const GradeItem: FC<{ grade: string, count: number }> = ({ grade, count }) => {
    const GradeMarker: FC<{ rank: string }> = ({ rank }) => <div className={`marker rank-bg--${grade.toLowerCase()}`} />;
    return (
      <div className='osu_player-grade'>
        <span className='markers'>
          <GradeMarker rank={ grade } />
          { 
            (grade === 'ssh' || grade === 'ss')
            ? <GradeMarker rank={ grade } />
            : <></>
          }
          </span>
        <span>{ count }</span>
      </div>
    );
  };

  return (
    <div className='osu_player-summary'>
      <div className='osu_player-header'>
        <div className='osu_player-header-details'>
          <div className='osu_player-avatar'>
            <img src={avatar_url} alt='user profile picture' />
          </div>
          <div className='osu_player-name'>
            <h3>{ username }</h3>
            <img src={`/flags/${country?.code ?? '__'}.png`} alt="" />
          </div>  
        </div>
        <div className='osu_player-header-bg'>
            <img src={ cover?.url ?? "cover.jpg" } alt="" />
        </div>
      </div>
      <div className='osu_player-details'>
        {
          stats.map((s: Statistic, i: number) => <StatItem key={i} i={i} data={s} />)
        }
      </div>
      <div className='osu_player-grades'>
        <GradeItem grade='ssh' count={ statistics.grade_counts.ssh } /> 
        <GradeItem grade='ss' count={ statistics.grade_counts.ss } /> 
        <GradeItem grade='sh' count={ statistics.grade_counts.sh } /> 
        <GradeItem grade='s' count={ statistics.grade_counts.s } /> 
        <GradeItem grade='a' count={ statistics.grade_counts.a } /> 
      </div>
    </div>
  );
};

export default PlayerStats;