import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = ({ token, perm }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(state.name);
  const [category, setCategory] = useState(state.category);
  const [price, setPrice] = useState(state.price);
  const [quantity, setQuantity] = useState(state.quantity);
  const [desc, setDesc] = useState(state.desc);

  return (
    <form className="container">
      <div className="page">
        <h2>Edit Product</h2>

        {/* name */}
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Product Name"
            type="text"
          />
        </div>

        {/* category */}
        <div>
          <label htmlFor="category">Product Category:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            placeholder="Product Category"
            type="text"
          />
        </div>

        {/* price */}
        <div>
          <label htmlFor="price">Product Price:</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            placeholder="Product Price"
            type="number"
          />
        </div>

        {/* quantity */}
        <div>
          <label htmlFor="quantity">Product Quantity:</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
            placeholder="Product Quantity"
            type="number"
          />
        </div>

        {/* description */}
        <div>
          <label htmlFor="">Product Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Product Description"
            id=""
          ></textarea>
        </div>

        {/* edits a product */}
        <div className="submit">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (price < 0 || quantity < 0)
                return alert("Quantity and Price cannot be a negative number");
              if (price > 10000 || quantity > 10000) {
                return alert("Number is to large");
              }
              const options = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  token,
                },
                body: JSON.stringify({
                  id: state.id,
                  permission: perm,
                  name,
                  category,
                  price,
                  quantity,
                  description: desc,
                }),
              };
              const editData = async () => {
                try {
                  const res = await fetch("/edit-product", options);
                  const data = await res.json();
                  if (!res.ok) {
                    alert(data.message);
                  } else {
                    alert(data.message);
                    navigate("/");
                  }
                } catch (err) {
                  console.log(err);
                }
              };
              editData();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
