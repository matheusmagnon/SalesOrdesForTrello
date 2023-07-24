import "./styles/index.css";

import { useState } from "react";
import Form from "./components/Form";
import { SalesOrderProvider } from "./context/SalesOrderContext";

function App() {
  return (
    <SalesOrderProvider>
      <div>
        <Form />
      </div>
    </SalesOrderProvider>
  );
}

export default App;
