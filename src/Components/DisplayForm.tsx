import { Link } from "react-router-dom";

type FormDataProps = {
  formData: {
    firstname: string;
    lastname: string;
    address: string;
    postcode: string;
    city: string;
    phone?: string;
    email: string;
  };
  orderId: number | null;
};

const DisplayForm = ({ formData, orderId }: FormDataProps) => {
  return (
    <div>
      <div>
        <h3>Ditt order nr: {orderId} </h3>
      </div>
      <div>
        <h3>En bekräftelse kommer att skickas till:</h3>
        <p>{formData.email}</p>
      </div>
      <Link to="/">Tillbaka till hemsidan</Link>
    </div>
  );
};

export default DisplayForm;
