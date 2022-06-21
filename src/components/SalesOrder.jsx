// import * as dotenv from 'dotenv/config';
import { useState } from "react";
import "../components/SalesOrder.css";
import renderComponent from "./renderComponent";
import { Main } from "./styles";

export function SalesOrder() {
  const [isShown, setIsShown] = useState([false]);

  return renderComponent(isShown);
}
