import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { ScoreType } from '@Types/score';
import { useStateContext } from '@Contexts/StateContext';
import { SignInButton, SignOutButton } from '@Components/Button';

const ScoreTypeHeader: React.FC = () => {
  const { data: session } = useSession();
  const { activeScoreType, setActiveScoreType } = useStateContext();

  const onScoreTypeSelected = (t: ScoreType) => {
    if (activeScoreType === t) {
      return;
    }
    
    setActiveScoreType(t);
  };

  const NavItem: React.FC<{ t: ScoreType, v: string, onClick: (s: ScoreType) => void }> = ({ t, v, onClick }) => {
    return (
      <button className={(activeScoreType === t) ? 'item active' : 'item'} onClick={ () => onClick(t) }>{ v }</button>
    );
  };

  return (
    <header>
      <nav>
        <NavItem t='best' v='top scores' onClick={ onScoreTypeSelected } />
        <NavItem t='firsts' v='firsts' onClick={ onScoreTypeSelected } />
        <NavItem t='recent' v='recents' onClick={ onScoreTypeSelected } />
      </nav>
      <Link href='/'>
        <button className='btn--me'>me!</button>
      </Link>
      {
        session ? <SignOutButton /> : <SignInButton />
      }
    </header>
  )
};

export default ScoreTypeHeader;