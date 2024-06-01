import { useState } from "react";
import { FormData } from "../types/FormData.types";

export default function useFormData() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    address: "",
    postcode: "",
    city: "",
    phone: "",
    email: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return { formData, setFormData, handleChange };
}
