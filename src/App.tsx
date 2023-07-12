import { SalesOrder } from "./components/SalesOrder";
// import './global.css';
import "./styles/index.css";

import SalesOrderContext from "./context/SalesOrderContext";
import { useState } from "react";

function App() {
  const [obj, setObj] = useState("teste");
  return (
    // <SalesOrderContext.Provider value={}>
    <div>
      <SalesOrder />
    </div>
    // </SalesOrderContext.Provider>
  );
}

export default App;
