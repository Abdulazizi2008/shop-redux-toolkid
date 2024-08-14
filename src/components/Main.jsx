import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, saveProducts } from "../store/productSlice";
import { addItem } from "../store/cartSlice";

function Main({ selectedBrand, selectedColor, selectPrice }) {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);
  const { items } = useSelector((store) => store.cart);
  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));
      let query = "https://headphones-server.onrender.com/products";

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }
      if (params.length) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const data = await response.json();
        dispatch(saveProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const sortedProducts = [...products].sort((p1, p2) => {
    if (selectPrice === "cheap") {
      return p1.price - p2.price;
    }
    if (selectPrice === "expensive") {
      return p2.price - p1.price;
    }
    return 0;
  });

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="main">
      <div className="as">MAIN</div>
      <h3>Products</h3>
      {loading && <div>Loading...</div>}
      <ul className="products">
        {sortedProducts.map((product) => (
          <li className="product-card" key={product.id}>
            <img src={product.image_url} alt={product.name} />
            <p>{product.name}</p>
            <h4>{product.brand_name}</h4>
            <ul
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              {product.color_options.map((color, index) => (
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
            <p>${product.price}</p>
            <button
              className="abcd"
              onClick={() => handleAddToCart(product)}
              disabled={items.some((item) => item.id === product.id)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
