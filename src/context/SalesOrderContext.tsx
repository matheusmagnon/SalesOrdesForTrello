import { Dispatch, SetStateAction, createContext } from "react";

interface TypeOrderContext {
  isWithdrawal: string;
  setIsWithdrawal: Dispatch<SetStateAction<string>>;
  isSalesOrderIsCompleted: boolean;
  setIsSalesOrderIsCompleted: Dispatch<SetStateAction<boolean>>;
}

export const OrderContext = createContext<TypeOrderContext>({
  isWithdrawal: "Retirada",
  setIsWithdrawal: () => {},
  isSalesOrderIsCompleted: false,
  setIsSalesOrderIsCompleted: () => {},
});
