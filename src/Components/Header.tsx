import "./Styles.scss";
import { Link } from "react-router-dom";
import { CartProduct } from "../types/Product.types";
import Cart from "./Cart";

export interface HeaderProps {
  shoppingCart: CartProduct[];
  setShoppingCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  handleRemoveItem: (index: number) => void;
}

const Header = ({
  shoppingCart,
  setShoppingCart,
  handleRemoveItem,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__cart">
        <Cart
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          handleRemoveItem={handleRemoveItem}
        />
      </div>
      <Link to="/">
        <h1 className="header__title">Bortakväll</h1>
      </Link>
    </header>
  );
};

export default Header;
