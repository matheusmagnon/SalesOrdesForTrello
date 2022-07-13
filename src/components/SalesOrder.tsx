// import * as dotenv from 'dotenv/config';
import { useState } from 'react';
import '../components/SalesOrder.css';

import OrderSent from './OrderSent'
import Form from './Form';

type IsSalesOrderCompleted = boolean;

export function SalesOrder() {
  const [isSalesOrderIsCompleted, setIsSalesOrderIsCompleted] = useState<IsSalesOrderCompleted>(false);

  if (isSalesOrderIsCompleted === true) {
    return <OrderSent />;
  } else {
    return <Form />;
  }
}
