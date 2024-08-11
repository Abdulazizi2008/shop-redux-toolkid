import { Link } from "react-router-dom";

function Heder({ selectPrice, setSelectPrice }) {
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
        <Link to="/cart">🛒</Link>
      </div>
    </header>
  );
}

export default Heder;
