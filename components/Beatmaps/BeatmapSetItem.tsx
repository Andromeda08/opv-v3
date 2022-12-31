import { OsuBeatmapSet, OsuBeatmap } from '@Types/score';
import * as d3 from 'd3';
import Link from 'next/link';
import { FaHeart, FaPlay } from 'react-icons/fa';

const BeatmapSetItem: React.FC<{ bm: OsuBeatmapSet }> = ({ bm }) => {
  // Source: https://github.com/ppy/osu-web/blob/66afb42e52479c3a990e9b9ae370298072e2e414/resources/assets/lib/utils/beatmap-helper.ts
  const difficultyColourSpectrum = d3.scaleLinear<string>()
    .domain([0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9])
    .clamp(true)
    .range(['#4290FB', '#4FC0FF', '#4FFFD5', '#7CFF4F', '#F6F05C', '#FF8068', '#FF4E6F', '#C645B8', '#6563DE', '#18158E', '#000000'])
    .interpolate(d3.interpolateRgb.gamma(2.2)); 
  
  const getDiffColor = (rating: number) => {
    if (rating >= 9) return '#000000';
    if (rating < 0.1) return '#AAAAAA';
    return difficultyColourSpectrum(rating);
  }

  return (
    <div className='osu_beatmap-set'>
      <Link href={`https://osu.ppy.sh/beatmapsets/${ bm.id }`} target='_blank'>
        <div className='song'>
          <span className='title'>{ bm.title }</span>
          <span className='artist'>{ bm.artist }</span>
          <div className='bg'>
            { bm.covers.cover ? <img src={ bm.covers.cover } alt='' /> : <></>}
          </div>
        </div>
      </Link>
      <div className='details'>
        <div className='info'>
          <FaHeart size={ 12 } />
          <span>{ bm.favourite_count }</span>
        </div>
        <div className='info'>
          <FaPlay size={ 12 } />
          <span>{ bm.play_count }</span>
        </div>
      </div>
      <div className='bottom'>
        <span className={`status ${ bm.status }`}>{ bm.status }</span>
        <div className='versions'>
          {
            bm.beatmaps!
              .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
              .map((e: OsuBeatmap, i: number) => (
                <Link href={`https://osu.ppy.sh/beatmaps/${ e.id }`} target='_blank' key={i}>
                  <a className='marker' style={{ background: getDiffColor(e.difficulty_rating) }} />
                </Link>
              ))
          }
        </div>
        {/*
        <div className='versions-big'>
          <span className='ellipsed text-sm'>{ bm.title } - { bm.artist }</span>
          { 
            bm.beatmaps!
              .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
              .map((e: OsuBeatmap, i: number) => (
                <Link href={`https://osu.ppy.sh/beatmaps/${ e.id }`} target='_blank'>
                  <a className='version'>
                    <div className='marker' style={{ background: getDiffColor(e.difficulty_rating) }}>
                      <span className={ e.difficulty_rating > 7 ? 'star golden' : 'star'}><FaStar /> { e.difficulty_rating }</span>
                    </div>
                    <span className='ellipsed'>{ e.version }</span>
                  </a>
                </Link>
              ))
            }
        </div>
        */}
      </div>
    </div>
  );
};

export default BeatmapSetItem;