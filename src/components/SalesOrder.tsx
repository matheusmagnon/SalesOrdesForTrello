// import * as dotenv from 'dotenv/config';
import { useState } from 'react';
import '../components/SalesOrder.css';
import Form from './Form';
import OrderSent from './OrderSent';

export function SalesOrder() {
  const [formIsCompleted, setFormIsCompleted] = useState<boolean>(false);

  return formIsCompleted == false ? <Form /> : <OrderSent />;
}
