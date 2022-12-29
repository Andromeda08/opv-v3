import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { SearchBar } from '@Components/SearchBar';
import ScoreTypeHeader from '@Components/Header';

interface ProfileProps {
  playerStats: ReactNode,
  children: ReactNode,
  msg?: string,
};

const ProfileLayout: FC<ProfileProps> = ({ playerStats, children, msg }) => {
  const router = useRouter();

  const onSubmitSearch = async (event: any) => {
    event.preventDefault();
    if (event.target.username.value) {
      router.push(`/api/osu/lookup?username=${ event.target.username.value }`);
    }
  }

  return (
    <main className='osu_page-layout'>
      <section className='osu_left-col'>
      <SearchBar onSubmit={ onSubmitSearch } error={ msg }/>
          { playerStats }
          <div className='madeby'>
            <Link href='https://osu.ppy.sh/users/6428418' target='_blank'>
              <a>made by -Andromeda-</a>
            </Link>
          </div>
      </section>
      <div className='osu_right-col'>
        <ScoreTypeHeader />
        <div className='osu_score-list'>
          { children }
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;