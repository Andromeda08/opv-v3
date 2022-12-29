import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar : FC<{
  onSubmit: (event: any) => void;
  error?: string
}> = ({ onSubmit, error }) => {
  return (
    <div className='osu_search-bar'>
      { error ? <p className='osu_sb-error'>{`Error: ${error}`}</p> : <></>}
      <form
        onSubmit={ onSubmit }
        className='osu_sb-form'
      >
        <input
          type='text'
          name='username'
          className='osu_sb-form-input'
          placeholder='osu!username'
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
