import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveColors, setLoading as setLoadingC } from "../store/colorSlice";
import { saveBrands, setLoading as setLoadingB } from "../store/brandSlice";
function Aside({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
}) {
  const { colors, brands } = useSelector((store) => store);
  const { loading: colorsLoading, colors: colorsList } = colors;
  const { loading: brandsLoading, brands: brandsList } = brands;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchColors() {
      dispatch(setLoadingC(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(saveColors(data));
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        dispatch(setLoadingC(false));
      }
    }
    async function fetchBrands() {
      dispatch(setLoadingB(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(saveBrands(data));
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        dispatch(setLoadingB(false));
      }
    }
    fetchColors();
    fetchBrands();
  }, []);

  return (
    <div className="aside">
      <div className="as">ASIDE</div>
      <h3>Brands</h3>
      {colorsLoading && <div>Loading...</div>}
      <ul className="brand-wrapper">
        {brandsList.map((brand, index) => (
          <li key={brand + index}>
            <input
              type="radio"
              id={brand}
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
      </ul>
      <button className="btn" onClick={() => setSelectedBrand("")}>
        reset
      </button>
      <h3>Colors</h3>
      {brandsLoading && <div>Loading...</div>}
      <ul className="color-wrapper">
        {colorsList.map((color, index) => {
          return (
            <li key={color + index}>
              <button
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  border: "1px solid",
                  borderRadius: "50%",
                  cursor: "pointer",
                  outlineOffset: "1px",
                  outline: selectedColor === color ? `2px solid ${color}` : "",
                }}
              ></button>
            </li>
          );
        })}
      </ul>
      <button className="btn" onClick={() => setSelectedColor("")}>
        reset
      </button>
    </div>
  );
}

export default Aside;
