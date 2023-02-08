import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '../../../../components/Layout';
import { useSession } from 'next-auth/react';

const AddItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const { data: session } = useSession();

  const id = session?.user?.id;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description, picture, price, category };
      await fetch('/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push(`/yard/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-auto flex-col items-center">
        <h2 className="text-2l font-bold">Add An Item</h2>
        <form className="p-4 border border-violet-600 rounded-lg flex flex-col items-center justify-center">
          <div className=" flex-row ">
            <label>Item Name</label>
            <input
              className="form-item"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
            />
          </div>
          <div className="flex-row ">
            <label>Description</label>
            <input
              className="form-item"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Can be left empty"
              value={description}
            />
          </div>
          <div className="flex-row">
            <label>Image</label>
            <input
              className="form-item"
              onChange={(e) => setPicture(e.target.value)}
              type="text"
              placeholder="Can be left empty"
              value={picture}
            />
          </div>
          <div className="flex-row">
            <label>Price</label>
            <input
              className="form-item"
              onChange={(e) => setPrice(e.target.value)}
              type="string"
              value={price}
            />
          </div>
          <div className="flex-row">
            <label>Category</label>
            <input
              className="form-item"
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              value={category}
            />
          </div>
          <button
            className="btn btn-primary m-2"
            type="submit"
            onClick={(e) => submitData(e)}
          >
            Add Item
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddItem;
