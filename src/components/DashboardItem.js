import React from "react";
import { useNavigate } from "react-router-dom";
import { lengthCheck } from "../logic";

const handleClick = (id, navigate, data) => {
  navigate(`/inventory/${id}`, { state: data });
};

// this is where the products are rendered
const DashboardItem = (
  // prettier-ignore
  { num, name, category, price, quantity, setShow, desc, id, setId },
) => {
  const navigate = useNavigate();

  const info = lengthCheck(name, category, price, quantity);
  const data = { name, category, price, quantity, desc, value: info.value, id };

  return (
    <>
      {/* prettier-ignore */}
      <tr>
        <td onClick={() => handleClick(id, navigate, data)}>{num}</td>
        <td onClick={() => handleClick(id, navigate, data)}>{info.newName}</td>
        <td onClick={() => handleClick(id, navigate, data)}>{info.newCategory}</td>
        <td onClick={() => handleClick(id, navigate, data)}>{"£" + price}</td>
        <td onClick={() => handleClick(id, navigate, data)}>{quantity}</td>
        <td onClick={() => handleClick(id, navigate, data)}>{"£" + info.value}</td>

        <td className="e-d">
          <div className="buttons">
            {/* link to edit-product */}
            <button
              onClick={() => {
                navigate("/edit-product", { state: data });
              }}
              className="edit"
              style={{ background: "green" }}
            >
              Edit
            </button>
            {/* delete pop up */}
            <button
              onClick={() => {
                setId(id);
                setShow(true);
              }}
              className="delete"
              style={{ background: "red" }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default DashboardItem;
