import { FC } from 'react';
import { useStateContext } from '@Contexts/StateContext';
import { Spinner } from '@Components/Spinner';
import { ScoreListEntry } from '@Components/Osu/ScoreListEntry';

export const ScoreList : FC<{
  scores: any;
  beatmaps: any;
}> = ({ scores, beatmaps }) => {
  const { loading } = useStateContext();

  return (
    <div className='osu_score-list'>
      <h3>top scores</h3>
      {
        loading
        ? (
        <div className='flex items-center justify-center p-4'>
          <Spinner />
        </div>
        ) : (
        scores.map((s: any, i: number) => (
          <ScoreListEntry
            score={ s }
            beatmap={ beatmaps[i] }
            key={ i }
          />
        ))
        )
      }
    </div>
  );
}
