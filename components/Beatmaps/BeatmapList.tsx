import type { FC } from 'react';
import type { UserBeatmapsRes } from '@Types/api';
import type { BeatmapType, OsuBeatmapSet } from '@Types/score';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import BeatmapSetItem from './BeatmapSetItem';
import { Loader } from '@Components/Spinner';

interface BeatmapListProps {
  userId: number,
  counts: {
    graveyard: number,
    loved: number,
    pending: number,
    ranked: number
  }
};

interface BMListProps {
  title: string,
  count: number,
  bms: OsuBeatmapSet[],
};

const fetcher = (url: string) => axios.get(url).then(r => r.data);

const BeatmapList: FC<BeatmapListProps> = ({ userId, counts }) => {
  const [ count_a, setCountA ] = useState<number>(10);
  const [ count_b, setCountB ] = useState<number>(10);
  const [ count_c, setCountC ] = useState<number>(10);
  const [ count_d, setCountD ] = useState<number>(10);

  const { data: beatmaps, error: bmError, isLoading: isBmLoading } = useSWR<UserBeatmapsRes>(`/api/osu/maps/${ userId }?a=${count_a}&b=${count_b}&c=${count_c}&d=${count_d}`, fetcher);

  const isEmpty = (arr: any[]): boolean => (arr.length === 0);

  const more_amount: number = 10;
  const showMore = (s: string) => {
    switch (s) {
      case 'graveyard':
        setCountA(count_a + more_amount);
        return;
      case 'loved':
        setCountB(count_b + more_amount);
        return;
      case 'pending':
        setCountC(count_c + more_amount);
        return;
      case 'ranked':
        setCountD(count_d + more_amount);
        return;
    };
  };

  const BmSection: FC<BMListProps> = ({ title, bms, count }) => {
    return (
      <div className='osu_beatmap-section'>
        <div className='title'>
          <h3>{ title }</h3>
          <span className='count'>{ count }</span>
        </div>
        <div className='sets'>
          { bms.map((e: OsuBeatmapSet, i: number) => <BeatmapSetItem bm={e} key ={i} />) }
        </div>
        { bms.length >= count ? <></> : <button className='btn--show-more' onClick={() => showMore(bms[0].status)}>show more</button> }
      </div>
    );
  };

  if (beatmaps) {
    const { graveyard, loved, pending, ranked } = beatmaps;
    const has = {
      graveyard: !isEmpty(graveyard),
      loved: !isEmpty(loved),
      pending: !isEmpty(pending),
      ranked: !isEmpty(ranked),
    };

    return (
      <div className='osu_beatmap-list'>
        { has.ranked ? <BmSection title='Ranked Beatmaps' count={ counts.ranked } bms={ ranked } /> : <></> }
        { has.loved ? <BmSection title='Loved Beatmaps' count={ counts.loved } bms={ loved } /> : <></> }
        { has.pending ? <BmSection title='Pending Beatmaps' count={ counts.pending } bms={ pending } /> : <></> }
        { has.graveyard ? <BmSection title='Graveyarded Beatmaps' count={ counts.graveyard } bms={ graveyard } /> : <></> }
      </div>
    );
  }

  return (
    <Loader />
  );
};

export default BeatmapList;