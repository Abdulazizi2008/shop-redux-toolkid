import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Heder from "./components/Heder";
import Aside from "./components/Aside";
import Main from "./components/Main";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectPrice, setSelectPrice] = useState("");

  return (
    <Router>
      <div className="container">
        <Heder selectPrice={selectPrice} setSelectPrice={setSelectPrice} />
        <div className="all">
          <Aside
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  selectedBrand={selectedBrand}
                  selectedColor={selectedColor}
                  selectPrice={selectPrice}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
