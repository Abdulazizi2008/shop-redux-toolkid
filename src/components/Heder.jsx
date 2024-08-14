import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Heder({ selectPrice, setSelectPrice }) {
  const { items } = useSelector((store) => store.cart);

  return (
    <header>
      <a href="#" className="logo">
        LOGO
      </a>
      <div className="abv">
        <select
          name="price"
          value={selectPrice}
          onChange={(e) => setSelectPrice(e.target.value)}
        >
          <option value="">none</option>
          <option value="cheap">cheap</option>
          <option value="expensive">expensive</option>
        </select>
        <div className="count">
          {items.length && <div className="len">{items.length}</div>}

          <Link to="/cart">🛒</Link>
        </div>
      </div>
    </header>
  );
}

export default Heder;
