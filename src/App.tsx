import { SalesOrder } from "./components/SalesOrder";
// import './global.css';
import "./styles/index.css";

import SalesOrderContext from "./context/SalesOrderContext";

function App() {
  return (
    // <SalesOrderContext.Provider value={}>
    <div>
      <SalesOrder />
    </div>
    // </SalesOrderContext.Provider>
  );
}

export default App;
