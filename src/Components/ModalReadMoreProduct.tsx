import { useState, useEffect } from "react";
import { Product } from "../types/Product.types";
import { getProduct as ProductsApi_getProduct } from "../Services/ProductsApi";

interface ModalReadMoreProductProps {
  product: Product;
  closeModal: (showModal: boolean) => void;
  handleAddToCart: (name: string) => void;
}

const ModalReadMoreProduct = ({
  product,
  closeModal,
  handleAddToCart,
}: ModalReadMoreProductProps) => {
  const [productData, setProductData] = useState<Product | null>(null);

  const getProduct = async () => {
    try {
      const dataProduct = await ProductsApi_getProduct(product.id);
      if (dataProduct.status === "success") {
        setProductData(dataProduct.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  function stripHtmlTags(html: string | undefined) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html ?? "";

    Array.from(tempDiv.children).forEach((child) => {
      const innerHtml = child.innerHTML;
      if (innerHtml) {
        const strippedText = innerHtml.replace(/<\/(p|em)>/g, "</p>\n");
        child.innerHTML = strippedText;
      }
    });

    return tempDiv.innerText || tempDiv.textContent || "";
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__close-top-btn">
          <button className="modal__btn-x" onClick={() => closeModal(false)}>
            X
          </button>
        </div>
        <div className="">
          <div className="modal__img-container">
            <img
              src={`https://www.bortakvall.se/${product.images.thumbnail}`}
              alt={product.name}
            />
          </div>
          <div className="modal__title">
            <h2 className="modal__name">{product.name}</h2>
            <h2>{product.price} kr</h2>
          </div>
          <div className="modal__description">
            {productData?.description ? (
              <p>{stripHtmlTags(productData?.description)}</p>
            ) : (
              <p>Saknar beskrivning...</p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                justifyContent: "center",
                padding: "1rem",
                fontWeight: "bold",
              }}
            >
              {product.tags.map((tag) => (
                <p key={tag.id}>{tag.name}</p>
              ))}
            </div>
          </div>
          <div className="modal__btn-container">
            <button
              className="modal__btn"
              onClick={() => handleAddToCart(product.name)}
            >
              Lägg till i varukorgen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReadMoreProduct;
