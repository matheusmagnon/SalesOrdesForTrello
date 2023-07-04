import { createContext } from "react";
import { string } from "yup";

const SalesOrderContext = createContext({ obj: string });

export default SalesOrderContext;
