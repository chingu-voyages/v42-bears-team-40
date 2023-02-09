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
        <div className='mx-auto my-2 flex-row justify-around'>
          <input
            className='m-1 p-2 border border-dark-green rounded-lg'
            onChange={(e) => setSearchText(e.target.value)}
            type='text'
            value={searchText}
            name='searchText'
          />
          <button className='m-1 btn text-white bg-dark-green border'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
