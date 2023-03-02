import React, { useEffect, useState } from "react";
import { stock, updates } from "../logic";
import Item from "./DashboardItem";
import DeleteProduct from "./DeleteProduct";
import PageButton from "./PageButton";

const Dashboard = ({ token, perm }) => {
  const [products, setProducts] = useState(null);
  const [current, setCurrent] = useState(1);
  const [all, setAll] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  // the length of amount will be used for page buttons
  let amount = ["page"];

  const zeroStock = products && stock(products);

  // just adding to the length. the string page means nothing
  if (all) {
    for (let i = 1; i < products?.length + 1; i++) {
      let j = i - 1;
      if (j % 6 === 0 && j !== 0) amount.push("page");
    }
  } else {
    for (let i = 1; i < zeroStock?.length + 1; i++) {
      let j = i - 1;
      if (j % 6 === 0 && j !== 0) amount.push("page");
    }
  }
  let count = 0;
  let count2 = 0;

  // fetches all of the products
  useEffect(() => {
    const fetchProducts = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      };
      const res = await fetch("/items", options);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [setProducts, token]);

  const info = products && updates(products);
  // will be used for page buttons
  const num = (current - 1) * 6;

  return (
    <div className="dashboard">
      <div className="stats">
        <h2>Inventory Stats</h2>
        <div className="stats-items">
          {/* total products */}
          <div style={{ background: "purple" }}>
            <h3>Total Products</h3>
            <p>{info?.totalProducts}</p>
          </div>
          {/* total value */}
          <div style={{ background: "green" }}>
            <h3>Total Value</h3>
            <p>{`£${info?.totalValue}`}</p>
          </div>
          {/* out of stocks */}
          <div style={{ background: "red" }}>
            <h3>Out of Stocks</h3>
            <p>{info?.outOfStocks}</p>
          </div>
        </div>
      </div>

      {/* inventory section */}
      {products === null ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="inventory">
            <div className="dashboard-stock">
              <h2>Inventory Items</h2>
              {/* this button will show out of stocks or show all items */}
              <button
                onClick={() => {
                  if (all) setCurrent(1);
                  setAll((prev) => !prev);
                }}
                style={{ background: all ? "red" : "purple" }}
              >
                {all ? "Show Out of Stocks" : "Show All"}
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* products are shown here 6 per page */}
                {all
                  ? products.slice(num, num + 6).map((item) => {
                      count2++;
                      return (
                        <Item
                          key={count2}
                          num={count2 + (current - 1) * 6}
                          id={item._id}
                          desc={item.description}
                          name={item.name}
                          category={item.category}
                          price={item.price}
                          quantity={item.quantity}
                          setShow={setShow}
                          setId={setId}
                        />
                      );
                    })
                  : zeroStock.slice(num, num + 6).map((item) => {
                      count2++;
                      return (
                        <Item
                          key={count2}
                          num={count2 + (current - 1) * 6}
                          id={item._id}
                          desc={item.description}
                          name={item.name}
                          category={item.category}
                          price={item.price}
                          quantity={item.quantity}
                          setShow={setShow}
                          setId={setId}
                        />
                      );
                    })}
              </tbody>
            </table>

            <DeleteProduct
              show={show}
              setShow={setShow}
              setProducts={setProducts}
              id={id}
              token={token}
              perm={perm}
            />
          </div>

          {/* will go to next page of items */}
          <div className="next-page">
            <button
              onClick={() => {
                count2 = (amount.length - 1) * 6;
                if (current > 1) {
                  setCurrent((prev) => prev - 1);
                }
              }}
              className="prev"
            >
              Prev
            </button>
            {/* this is the page buttons section under the product items */}
            <div className="pages">
              {amount.map(() => {
                count++;
                return (
                  <PageButton
                    key={count}
                    count={count}
                    products={products}
                    current={current}
                    setCurrent={setCurrent}
                  />
                );
              })}
            </div>

            {/* will go to the previous page */}
            <button
              onClick={() => {
                count2 = (amount.length - 1) * 6;
                if (current < amount.length) {
                  setCurrent((prev) => prev + 1);
                }
              }}
              className="next"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
