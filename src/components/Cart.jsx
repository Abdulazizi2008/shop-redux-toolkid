import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

function Cart() {
  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

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
          {items.map((item, index) => (
            <li key={index} className="product-card">
              <img src={item.image_url} alt={item.name} />
              <p>{item.name}</p>
              <h4>{item.brand_name}</h4>
              <ul
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  paddingTop: "10px",
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
              <p>{item.price}</p>
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
