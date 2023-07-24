import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface TypeOrderContext {
  isWithdrawal: string;
  setIsWithdrawal: Dispatch<SetStateAction<string>>;
  isSalesOrderIsCompleted: boolean;
  setIsSalesOrderIsCompleted: Dispatch<SetStateAction<boolean>>;
}

interface SalesOrderProviderProps {
  children: ReactNode;
}

export const OrderContext = createContext<TypeOrderContext>({
  isWithdrawal: "Retirada",
  setIsWithdrawal: () => {},
  isSalesOrderIsCompleted: false,
  setIsSalesOrderIsCompleted: () => {},
});

export function SalesOrderProvider({ children }: SalesOrderProviderProps) {
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
      {children}
    </OrderContext.Provider>
  );
}
