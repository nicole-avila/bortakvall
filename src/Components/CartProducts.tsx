import "./Styles.scss";
import { useState, useEffect } from "react";
import { CartProduct } from "../types/Product.types";

interface CartProductsProps {
  shoppingCart: CartProduct[];
  handleRemoveItem: (index: number) => void;
}

const CartProducts = ({
  shoppingCart,
  handleRemoveItem,
}: CartProductsProps) => {
  const [total, setTotal] = useState(0);

  const updateTotal = (updatedCart: CartProduct[]) => {
    const newTotal = updatedCart.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    updateTotal(shoppingCart);
  }, [shoppingCart]);

  return (
    <div className="cart-products">
      <div className="cart-products__content">
        {shoppingCart.map((product, index) => (
          <div className="cart-products__product" key={index}>
            <li className="cart-products__show-item">
              <p>
                {product.name} - {product.price} kr
              </p>
              <button
                className="cart-products__remove-btn"
                onClick={() => handleRemoveItem(index)}
              >
                Ta bort
              </button>
            </li>
          </div>
        ))}
      </div>
      <h2 className="cart-products__total">Totala summan: {total} kr</h2>
    </div>
  );
};

export default CartProducts;
