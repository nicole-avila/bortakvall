import "./Styles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartProduct } from "../types/Product.types";
import CartProducts from "./CartProducts";
import cartIcon from "../assets/cart.svg";

type CartProps = {
  shoppingCart: CartProduct[];
  setShoppingCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  handleRemoveItem: (index: number) => void;
};

const Cart = ({ shoppingCart, setShoppingCart }: CartProps) => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...shoppingCart];
    updatedCart.splice(index, 1);
    setShoppingCart(updatedCart);
  };

  return (
    <div ref={cartRef} className="cart">
      <div
        onClick={() => {
          setShowCart(!showCart);
        }}
        className="cart__container"
      >
        <div className="cart__quantity-container">
          {shoppingCart.length > 0 && (
            <p className="cart__quantity">{shoppingCart.length}</p>
          )}
        </div>
        <img src={cartIcon} alt="an icon of a shopping carts" />
      </div>
      {showCart ? (
        <article className="cart__show-cart">
          <h3 className="cart__title">Tillagde Produkter</h3>
          <CartProducts
            shoppingCart={shoppingCart}
            handleRemoveItem={handleRemoveItem}
          />
          <Link to="/checkout">
            <button className="cart__to-checkout-btn">Till Kassan</button>
          </Link>
        </article>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
