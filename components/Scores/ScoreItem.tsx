import { OsuScore } from '@Types/score';
import type { FC } from 'react';
import { shorten, decimate } from '@Utility/functions';

interface ScoreItemProps {
  score: OsuScore,
};

const ScoreItem: FC<ScoreItemProps> = ({ score }) => {
  return (
    <div className='osu_score'>
      <div className={`osu_score-rank rank-bg--${score.rank.toLowerCase()}`} />
      <div className='osu_score-details'>
        <p>
          <span className='osu_score-bm-title'>{ shorten(score.beatmapset.title, 32) }</span>
          <span className='osu_score-bm-artist'> by { shorten(score.beatmapset.artist) }</span>
        </p>
        <p className='osu_score-bm-version'>
          { score.beatmap.version }
        </p>
      </div>
      <div className='end'>
        {
          score.mods.length > 0
          ? (
            <p className='osu_score-mods'>
              { score.mods.map((m: string) => <>{m}</>)}
            </p>
          ) : ( <></>)
        }
        <p className={`osu_score-pp rank--${score.rank.toLowerCase()}`}>
          <span>{ decimate(score.pp, 0) }</span>
          <span className='text'>pp</span>
        </p>
      </div>
    </div>
  );
};

export default ScoreItem;
