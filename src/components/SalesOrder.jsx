// import * as dotenv from 'dotenv/config';
import { useState } from "react";
import "../components/SalesOrder.css";
import renderComponent from "./renderComponent"

export function SalesOrder() {
  const [isShown, setIsShown] = useState([false]);

  return (
    <main >
      <div className="containerForm">
        <h1>
          Pedido de BENTÔ CAKE <br /> (bolinho de 350g)
        </h1>
     {renderComponent(isShown)}
      </div>
    </main>
  );
}

