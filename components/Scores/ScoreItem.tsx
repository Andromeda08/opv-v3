import { OsuScore } from '@Types/score';
import type { FC } from 'react';
import Link from 'next/link';
import { shorten, decimate } from '@Utility/functions';

interface ScoreItemProps {
  score: OsuScore,
};

const ScoreItem: FC<ScoreItemProps> = ({ score }) => {
  const Dot: FC = () => (
    <div className='dot' />
  );

  return (
    <div className='osu_score'>
      <div className='h-full flex items-center gap-2'>
        <div className={`osu_score-rank rank-bg--${score.rank.toLowerCase()}`} />
        <div className='osu_score-details'>
          <Link href={`https://osu.ppy.sh/beatmapsets/${ score.beatmapset.id }#${ score.beatmap.mode }/${ score.beatmap.id }`} target='_blank'>
            <a className='osu_score-bm-song'>
              <span className='osu_score-bm-title'>{ shorten(score.beatmapset.title, 32) }</span>
              <span className='osu_score-bm-artist'> by { shorten(score.beatmapset.artist) }</span>
            </a>
          </Link>
          <p className='osu_score-bm-version'>
            { score.beatmap.version }
          </p>
        </div>
      </div>
      <div className='osu_score-stats'>
        {
          score.mods.length > 0
          ? (
            <>
            <p className='osu_score-mods'>{ score.mods.map((m: string, i: number) => <span className={`mod--${ m.toLowerCase() }`} key={i}>{m}</span>)}</p>
            <Dot />
            </>
          ) : ( <></>)
        }
        <p className='osu_score-acc'>{ (score.accuracy === 1) ? '100' : decimate(score.accuracy * 100, 2) }%</p>
        <Dot />
        <p className={`osu_score-pp rank--${score.rank.toLowerCase()}`}>
          <span>{ decimate(score.pp, 0) }</span>
          <span className='text'>pp</span>
        </p>
      </div>
    </div>
  );
};

export default ScoreItem;
