import React, { useState } from "react";

// only admin can access this
const Users = ({ user, token }) => {
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");
  const role = user && user[0].role;

  return (
    <>
      {role === "Admin" ? (
        <div className="admin">
          <form>
            <label htmlFor="user">Search for user by username:</label>
            <div className="search-section">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for user"
                id="user"
                type="text"
              />
              {/* searchs for user that was typed in input box */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  try {
                    const options = {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        token,
                      },
                      body: JSON.stringify({ search }),
                    };
                    const getSearch = async () => {
                      const res = await fetch("/search", options);
                      const data = await res.json();
                      if (res.ok) {
                        setResult(data);
                      } else alert(data.message);
                    };
                    getSearch();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* changing permission of found user */}
          {result && (
            <div className="found-user">
              username:{" "}
              <span className="foundUser">{`${result[0].username}`}</span>
              <p>
                permission:{" "}
                <span
                  className={result[0].permission ? "true" : "false"}
                >{`${result[0].permission}`}</span>
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  try {
                    const options = {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        token,
                      },
                      body: JSON.stringify({
                        id: result[0]._id,
                        permission: result[0].permission,
                      }),
                    };
                    const getSearch = async () => {
                      const res = await fetch("/search", options);
                      const data = await res.json();
                      if (res.ok) {
                        alert("permissions updated");
                        setResult([data]);
                      }
                    };
                    getSearch();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Change permission
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="not-admin">Sorry only the admin can see this page!</div>
      )}
    </>
  );
};

export default Users;
