// @ts-nocheck
import {
  shorten,
  decimate
} from '@Utility/functions';

export const ScoreListEntry : React.FC<{
  score: any;
  beatmap: any;
}> = ({ score, beatmap }) => {
  return (
    <div className='osu_score'>
      <div className={`osu_score-rank rank-bg--${score.rank.toLowerCase()}`} />
      <div className='osu_score-details'>
        <p>
          <span className='osu_score-bm-title'>{ beatmap.title }</span>
          <span className='osu_score-bm-artist'> by { shorten(beatmap.artist) }</span>
        </p>
        <p className='osu_score-bm-version'>
          { beatmap.version }
        </p>
      </div>
      <p className={`osu_score-pp rank--${score.rank.toLowerCase()}`}>
        <span>{ decimate(score.pp, 0) }</span>
        <span className='text'>pp</span>
      </p>
    </div>
  );
}
