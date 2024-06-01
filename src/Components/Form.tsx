import "./Styles.scss";
import { useState } from "react";
import { FormData } from "../types/FormData.types";
import useFormData from "../hooks/useFormData";
import DisplayForm from "./DisplayForm";

export interface FormProps {
  handleOrderSubmission: (formData: FormData) => Promise<null | undefined>;
  orderId: number | null;
}

const Form = ({ handleOrderSubmission, orderId }: FormProps) => {
  const { formData, handleChange } = useFormData();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = await handleOrderSubmission(formData);
    if (id !== null) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="form">
      {formSubmitted && orderId && (
        <h1>Tack för din beställning {formData.firstname}! </h1>
      )}
      {formSubmitted ? (
        <DisplayForm formData={formData} orderId={orderId} />
      ) : (
        <form onSubmit={handleSubmit} className="form__content">
          <label htmlFor="firstname">Namn*</label>
          <input
            type="text"
            onChange={handleChange}
            name="firstname"
            id="firstname"
            value={formData.firstname}
            required
          />

          <label htmlFor="lastname">Efternamn*</label>
          <input
            type="text"
            onChange={handleChange}
            name="lastname"
            id="lastname"
            value={formData.lastname}
            required
          />

          <label htmlFor="address">Adress*</label>
          <input
            type="text"
            onChange={handleChange}
            name="address"
            id="address"
            value={formData.address}
            required
          />

          <label htmlFor="postcode">Post nummer*</label>
          <input
            type="number"
            onChange={handleChange}
            name="postcode"
            id="postcode"
            value={formData.postcode}
            required
          />

          <label htmlFor="city">Stad*</label>
          <input
            type="text"
            onChange={handleChange}
            name="city"
            id="city"
            value={formData.city}
            required
          />

          <label htmlFor="phone">Telefon nummer</label>
          <input
            type="number"
            onChange={handleChange}
            name="phone"
            id="phone"
            value={formData.phone}
          />

          <label htmlFor="email">Email*</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            id="email"
            value={formData.email}
            required
          />
          <br />
          <button type="submit">Skicka</button>
        </form>
      )}
    </div>
  );
};

export default Form;
