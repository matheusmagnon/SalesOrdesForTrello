// import { SalesOrder } from "./components/SalesOrder";
// import './global.css';
import "./styles/index.css";

// import SalesOrderContext from "./context/SalesOrderContext";
import { useState } from "react";
import Form from "./components/Form";
import { OrderContext } from "./context/SalesOrderContext";

function App() {
  const [isWithdrawal, setIsWithdrawal] = useState<string>("Retirada");
  const [isSalesOrderIsCompleted, setIsSalesOrderIsCompleted] = useState(false);
  return (
    <OrderContext.Provider
      value={{
        isWithdrawal,
        setIsWithdrawal,
        isSalesOrderIsCompleted,
        setIsSalesOrderIsCompleted,
      }}
    >
      <div>
        <Form />
      </div>
    </OrderContext.Provider>
  );
}

export default App;
