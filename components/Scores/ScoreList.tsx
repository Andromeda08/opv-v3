import { OsuScore } from '@Types/score';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import ScoreItem from '@Components/Scores/ScoreItem';
import { useStateContext } from '@Contexts/StateContext';
import { Loader } from '@Components/Spinner';

interface ScoreListProps {
  userId: number,
};

const fetcher = (url: string) => axios.get(url).then(r => r.data);

const ScoreList: React.FC<ScoreListProps> = ({ userId }) => {
  const [ count, setCount ] = useState<number>(25);
  const { activeTab } = useStateContext();
  const { data: scores, error, isLoading } = useSWR<OsuScore[]>(`/api/osu/scores/${userId}/${activeTab}?limit=${count}`, fetcher);

  const showMore = () => setCount(count + 25);

  if (scores) {
    return (
      <div className='osu_score-list'>
        { (scores.length > 0)
          ? scores.map((s: OsuScore, index: number) => <ScoreItem score={s} key={index} />)
          : <p>No scores to show.</p>
        }
        {
          (scores.length >= 100 || scores.length === 0) ? <></> : <button className='btn--show-more' onClick={() => showMore()}>show more</button>
        }
      </div>
    );
  }

  return (
    <Loader />
  );
};

export default ScoreList;