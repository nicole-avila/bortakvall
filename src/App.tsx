import "./App.scss";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Checkout from "./Pages/Checkout";
import Header from "./Components/Header";
import { CartProduct } from "./types/Product.types";

function App() {
  const [shoppingCart, setShoppingCart] = useState<CartProduct[]>(
    localStorage.getItem("shoppingCart")
      ? JSON.parse(localStorage.getItem("shoppingCart")!)
      : []
  );

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...shoppingCart];
    updatedCart.splice(index, 1);
    setShoppingCart(updatedCart);
  };

  return (
    <div className="App">
      <Header
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        handleRemoveItem={handleRemoveItem}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              handleRemoveItem={handleRemoveItem}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              handleRemoveItem={handleRemoveItem}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
