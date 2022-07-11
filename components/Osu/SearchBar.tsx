import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';

import { default_user } from '@Utility/constants';

export const SearchBar : FC<{
  username: string;
  onSubmit: () => void;
}> = ({ username, onSubmit }) => {
  return (
    <div className='osu_search-bar'>
      <form
        onSubmit={ onSubmit }
        className='osu_sb-form'
      >
        <input
          type='text'
          name='username'
          className='osu_sb-form-input'
          placeholder={ (username === default_user) ? 'osu!username' : username }
          autoComplete='off'
        />
        <button
          type='submit'
          className='osu_sb-form-btn'
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
