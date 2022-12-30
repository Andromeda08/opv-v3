import { OsuScore } from '@Types/score';
import ScoreItem from '@Components/Scores/ScoreItem';

interface ScoreListProps {
  data: OsuScore[];
};

const ScoreList: React.FC<ScoreListProps> = ({ data }) => {
  return (
    <div className='osu_score-list'>
      { (data.length > 0)
        ? data.map((s: OsuScore, index: number) => <ScoreItem score={s} key={index} />)
        : <p>No scores to show.</p>
      }
    </div>
  );
};

export default ScoreList;