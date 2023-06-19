// import * as dotenv from 'dotenv/config';
import { useState } from "react";
// import '../components/SalesOrder.css';
import Form from "../Form/Form";
import OrderSent from "../OrderSent/OrderSent";

export function SalesOrder() {
  const [formIsCompleted, setFormIsCompleted] = useState<boolean>(false);

  return formIsCompleted == false ? <Form /> : <OrderSent />;
}
