import "./Styles.scss";
import { useState } from "react";
import { Product } from "../types/Product.types";
import ModalReadMoreProduct from "./ModalReadMoreProduct";

interface ProductItemProps {
  product: Product;
  selectedToCart: (productName: string) => void;
}

const ProductItem = ({ product, selectedToCart }: ProductItemProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (name: string) => {
    selectedToCart(name);
  };

  return (
    <div key={product.id} className="product-item">
      <img
        className="product-item__img"
        src={`https://www.bortakvall.se/${product.images.thumbnail}`}
        alt={product.name}
      />
      <h2 className="product-item__name">{product.name}</h2>
      <p className="product-item__price">{product.price} kr</p>
      <div className="product-item__btn-container">
        <button
          onClick={() => handleAddToCart(product.name)}
          className="product-item__btn-add"
        >
          Lägg till
        </button>
        <br />
        <button
          onClick={() => {
            setShowModal(!showModal);
          }}
          className="product-item__btn-readMore"
        >
          Läs mer
        </button>
      </div>
      {showModal && (
        <ModalReadMoreProduct
          product={product}
          closeModal={setShowModal}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductItem;
