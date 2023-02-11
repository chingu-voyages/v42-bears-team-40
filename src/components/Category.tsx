import React from 'react';

const Category = ({ setCategory, handleCategoryFiltering }) => {
  const handleCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    handleCategoryFiltering(e.target.value);
  };
  return (
    <>
      <select
        className='m-1 p-2 bg-white border border-dark-green rounded-lg'
        onChange={(e) => handleCategory(e)}
      >
        <option value='all'>Search By Category</option>
        <option value='books'>Books</option>
        <option value='clothing'>Clothing</option>
        <option value='crafts'>Crafts</option>
        <option value='electronics'>Electronics</option>
        <option value='furniture'>Furniture</option>
        <option value='games'>Games</option>
        <option value='kitchen'>Kitchen</option>
        <option value='movies'>Movies</option>
        <option value='music'>Music</option>
        <option value='other'>Other</option>
        <option value='outdoors'>Outdoors</option>
        <option value='sports'>Sports</option>
        <option value='toys'>Toys</option>
      </select>
    </>
  );
};
export default Category;
