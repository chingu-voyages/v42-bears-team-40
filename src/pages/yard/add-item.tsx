import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";

const AddItem: React.FC = () => {
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const title = "Samsung Galaxy tablet";
    const description = "Lorem ipsum dolor sit amet consectetur adipisic";
    const picture = "Image not available";
    const price = 84;
    const category = "Electronics";
    try {
      const body = { title, description, picture, price, category };
      await fetch("/api/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div>Add Item Page</div>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={(e) => submitData(e)}
      >
        Add Item
      </button>
    </Layout>
  );
};

export default AddItem;
