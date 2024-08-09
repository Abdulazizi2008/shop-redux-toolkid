import { useState } from "react";

import "./App.css";
import Heder from "./components/Heder";
import Aside from "./components/Aside";
import Main from "./components/Main";

// const initialState = {
//   products: [],
//   colors: [],
//   brands: [],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_COLORS":
//       return { ...state, colors: action.payload };
//     case "SET_BRANDS":
//       return { ...state, brands: action.payload };
//     case "SET_PRODUCTS":
//       return { ...state, products: action.payload };
//     default:
//       return state;
//   }
// }

function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectPrice, setSelectPrice] = useState("");

  return (
    <div className="container">
      <Heder selectPrice={selectPrice} setSelectPrice={setSelectPrice} />
      <div className="all">
        <Aside
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Main
          selectedBrand={selectedBrand}
          selectedColor={selectedColor}
          selectPrice={selectPrice}
        />
      </div>
    </div>
  );
}

export default App;
