import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStateContext } from '@Contexts/StateContext';
import { SignInButton, SignOutButton } from '@Components/Button';
import { TabType } from '@Types/context';

const ScoreTypeHeader: React.FC = () => {
  const { data: session } = useSession();
  const { activeTab, setActiveTab } = useStateContext();

  const onTabSelected = (t: TabType) => {
    if (activeTab === t) {
      return;
    }
    
    setActiveTab(t);
  };

  const Dot: React.FC = () => (
    <div className='w-[2px] h-[12px] bg-zinc-400 dark:bg-zinc-700 rounded-full' />
  );

  const NavItem: React.FC<{ t: TabType, v: string, onClick: (s: TabType) => void }> = ({ t, v, onClick }) => {
    return (
      <button className={(activeTab === t) ? 'item active' : 'item'} onClick={ () => onClick(t) }>{ v }</button>
    );
  };

  return (
    <header>
      <nav>
        <NavItem t='best' v='top scores' onClick={ onTabSelected } />
        <NavItem t='firsts' v='firsts' onClick={ onTabSelected } />
        <NavItem t='recent' v='recents' onClick={ onTabSelected } />
        <Dot />
        <NavItem t='beatmaps' v='beatmaps' onClick={ onTabSelected } />
      </nav>
      <div>
        <Link href='/'>
          <button className='btn--me'>me!</button>
        </Link>
        { session ? <SignOutButton /> : <SignInButton /> }
      </div>
    </header>
  )
};

export default ScoreTypeHeader;