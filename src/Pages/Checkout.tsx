import Form from "../Components/Form";
import { useState, useEffect } from "react";
import { HeaderProps } from "../Components/Header";
import { OrderProduct } from "../types/Order.types";
import { FormData } from "../types/FormData.types";
import { CartProduct } from "../types/Product.types";
import { postOrder as ProductsApi_postOrder } from "../Services/ProductsApi";
import CartProducts from "../Components/CartProducts";

const Checkout = ({
  shoppingCart,
  setShoppingCart,
  handleRemoveItem,
}: HeaderProps) => {
  const [orderId, setOrderId] = useState<number | null>(null);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  shoppingCart = shoppingCart || [];

  const calculateOrderItems = (shoppingCart: CartProduct[]) => {
    return shoppingCart.map((product) => ({
      product_id: product.id,
      qty: product.amount ?? 1,
      item_price: product.price,
      item_total: product.price * (product.amount ?? 1),
    }));
  };

  const calculateOrderTotal = (orderItems: OrderProduct[]) => {
    return orderItems.reduce((acc, item) => acc + item.item_total, 0);
  };

  const createOrderData = (
    formData: FormData,
    orderItems: OrderProduct[],
    orderTotal: number
  ) => {
    return {
      customer_first_name: formData.firstname,
      customer_last_name: formData.lastname,
      customer_address: formData.address,
      customer_postcode: formData.postcode,
      customer_city: formData.city,
      customer_email: formData.email,
      customer_phone: formData.phone,
      order_total: orderTotal,
      order_items: orderItems,
    };
  };

  const handleOrderSubmission = async (formData: FormData) => {
    const orderItems = calculateOrderItems(shoppingCart);
    const orderTotal = calculateOrderTotal(orderItems);
    const orderData = createOrderData(formData, orderItems, orderTotal);

    try {
      const response = await ProductsApi_postOrder(orderData);
      if (response.status === "success") {
        setOrderId(response.data.id);
        setIsOrderSubmitted(true);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Order submission failed", error);
      return null;
    }
  };

  useEffect(() => {
    if (isOrderSubmitted) {
    }
  }, [isOrderSubmitted]);

  return (
    <div className="checkout">
      <h1 className="checkout__title">Din VaruKorg</h1>
      <div className="checkout__container">
        <div className="checkout__products-list">
          <CartProducts
            shoppingCart={shoppingCart}
            handleRemoveItem={handleRemoveItem}
          />
          <div className="checkout__btn-container">
            <button
              className="checkout__btn-emptyAll"
              onClick={() => {
                if (
                  window.confirm("Är du säker att du vill tömma varukorgen?")
                ) {
                  setShoppingCart([]);
                }
              }}
            >
              Töm Varukorg
            </button>
          </div>
        </div>

        <Form handleOrderSubmission={handleOrderSubmission} orderId={orderId} />
      </div>
    </div>
  );
};

export default Checkout;
