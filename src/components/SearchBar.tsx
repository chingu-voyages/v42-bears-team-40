import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    handleSearch(searchText);
    setSearchText('');
  };

  return (
    <div>
      <form onSubmit={(e) => handleChange(e)}>
        <div className='mx-auto my-2 text-center w-full md:flex'>
          <div className='flex'>
            <input
              className='m-0 p-2 border grow h-10 border-dark-green rounded-lg rounded-r-none'
              onChange={(e) => setSearchText(e.target.value)}
              type='text'
              value={searchText}
              name='searchText'
            />
            <button className='rounded-r-lg bg-dark-green py-2 px-3 tracking-wide text-white hover:bg-emerald-800 inline-block h-10 md:mr-1'>
              Search
            </button>
          </div>
          <button
            className='my-1 md:mr-4 tracking-wide w-28 text-dark-green hover:underline inline-block'
            onClick={(e) => setSearchText('')}
          >
            Clear Search
          </button>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
