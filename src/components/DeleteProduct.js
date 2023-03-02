import React from "react";

const DeleteProduct = ({ show, setShow, id, setProducts, token, perm }) => {
  return (
    <div className={show ? "show" : "hide"}>
      {/* empty div is an absolute div for styling */}
      <div className="delete-section"></div>
      <div className="delete-product">
        <h2>Delete Product!</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="delete-buttons">
          {/* clicking this will delete product */}
          <button
            onClick={() => {
              setShow(false);
              const options = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  token,
                },
                body: JSON.stringify({ id, permission: perm }),
              };
              const deleteProduct = async () => {
                try {
                  const res = await fetch("/items", options);
                  const data = await res.json();
                  if (!res.ok) {
                    alert(data.message);
                  } else {
                    setProducts(data);
                    alert("delete successful");
                  }
                } catch (err) {
                  console.log(err);
                }
              };
              deleteProduct();
            }}
          >
            Delete
          </button>
          {/* cancels delete */}
          <button onClick={() => setShow(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
