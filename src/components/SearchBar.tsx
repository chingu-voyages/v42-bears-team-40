import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <div>
      <form onSubmit={(e) => handleChange(e)}>
        <div className='mx-auto my-2 flex-row justify-around'>
          <input
            className='m-1 p-2 border border-dark-green rounded-lg'
            onChange={(e) => setSearchText(e.target.value)}
            type='text'
            value={searchText}
            name='searchText'
          />
          <button className='m-1 btn tracking-wide text-white bg-dark-green border hover:bg-custom-yellow'>
            Search
          </button>
          <button
            className='m-1 btn tracking-wide text-dark-green bg-white border p-2 w-auto inline-block'
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
