import { useEffect, useState } from "react";
import { getAllProducts as ProductsApi_getAllProducts } from "../Services/ProductsApi";
import { Product } from "../types/Product.types";
import { CartProduct } from "../types/Product.types";
import { HeaderProps } from "../Components/Header";
import ProductItem from "../Components/ProductItem";

const Landing = ({ shoppingCart, setShoppingCart }: HeaderProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getAllProducts = async () => {
    try {
      const dataProducts = await ProductsApi_getAllProducts();
      if (dataProducts.status === "success") {
        setProducts(dataProducts.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ops! Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const tempShoppingCart = [...shoppingCart];
    const cartProduct: CartProduct = {
      ...product,
      amount: 1,
      total_price: product.price,
    };
    tempShoppingCart.push(cartProduct);
    setShoppingCart(tempShoppingCart);
  };

  return (
    <div>
      <main>
        <p>{errorMessage}</p>
        <div className="App__product-item">
          {products?.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              selectedToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
