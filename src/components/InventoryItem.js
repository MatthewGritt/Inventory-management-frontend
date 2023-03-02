import React from "react";
import { useLocation } from "react-router-dom";

// Shows when a product is clicked
const InventoryItem = () => {
  const { state } = useLocation();
  const stock = state?.quantity;

  return (
    <>
      {state ? (
        <div className="container">
          <div className="inventory-item">
            <h2>
              Product Avaliabilty{" "}
              <span className={stock > 0 ? "in-stock" : "out-of-stock"}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </h2>
            <h3>
              Name:
              <span>{state.name}</span>
            </h3>
            <h3>
              Category:
              <span>{state.category}</span>
            </h3>
            <h3>
              Price: <span>{`£${state.price}`}</span>
            </h3>
            <h3>
              Quantity in stock:
              <span>{stock}</span>
            </h3>
            <h3>
              Total value:
              <span>{`£${state.value}`}</span>
            </h3>
            <div className="desc">
              <h3>Description:</h3>
              <p>{state.desc}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Could not find product</div>
      )}
    </>
  );
};

export default InventoryItem;
