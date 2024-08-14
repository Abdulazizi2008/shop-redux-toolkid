import { useSelector, useDispatch } from "react-redux";
import { clearCart, deleteItem } from "../store/cartSlice";
import { useState, useEffect } from "react";

function Cart() {
  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [counts, setCounts] = useState(() => {
    const savedCounts = JSON.parse(localStorage.getItem("counts")) || {};
    return savedCounts;
  });

  useEffect(() => {
    localStorage.setItem("counts", JSON.stringify(counts));
  }, [counts]);

  const handleIncrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    }));
  };

  const handleInputChange = (id, e) => {
    const value = Number(e.target.value);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: value >= 0 ? value : 0,
    }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete from cart?");
    if (confirmDelete) {
      dispatch(deleteItem(id));
      setCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        delete newCounts[id];
        return newCounts;
      });
    }
  };

  return (
    <div className="cart" style={{ textAlign: "center" }}>
      <h2 style={{ marginLeft: "20px" }}>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {items.map((item) => (
            <li key={item.id} className="products-card">
              <div className="all2">
                <div>
                  <img src={item.image_url} alt={item.name} />
                </div>
                <div className="par1">
                  <p>{item.name}</p>
                  <h3>{item.brand_name}</h3>
                  <ul
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      paddingTop: "20px",
                    }}
                  >
                    {item.color_options.map((color, index) => (
                      <li
                        key={index}
                        style={{
                          backgroundColor: color,
                          width: "20px",
                          height: "20px",
                          border: "1px solid",
                          borderRadius: "50%",
                        }}
                      ></li>
                    ))}
                  </ul>
                </div>
                <p>${item.price}</p>
              </div>
              <div>
                <div className="par2">
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                  <input
                    type="number"
                    min={0}
                    value={counts[item.id] || 0}
                    onChange={(e) => handleInputChange(item.id, e)}
                  />
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    outline: "none",
                    textTransform: "uppercase",
                    border: "none",
                    marginTop: "10px",
                  }}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => dispatch(clearCart())}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          outline: "none",
          textTransform: "uppercase",
          border: "none",
          marginTop: "10px",
        }}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;
