import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Images extends FileList {
  name: string;
  size: number;
  URLpreview: string;
}

interface TypeOrderContext {
  isWithdrawal: string;
  setIsWithdrawal: Dispatch<SetStateAction<string>>;
  isSalesOrderIsCompleted: boolean;
  setIsSalesOrderIsCompleted: Dispatch<SetStateAction<boolean>>;
  imagesBento: any[];
  setImageBento: Dispatch<SetStateAction<any>>;
}

interface SalesOrderProviderProps {
  children: ReactNode;
}

export const OrderContext = createContext<TypeOrderContext>({
  isWithdrawal: "Retirada",
  setIsWithdrawal: () => {},
  isSalesOrderIsCompleted: false,
  setIsSalesOrderIsCompleted: () => {},
  imagesBento: [],
  setImageBento: () => {},
});

export function SalesOrderProvider({ children }: SalesOrderProviderProps) {
  const [isWithdrawal, setIsWithdrawal] = useState<string>("Retirada");
  const [isSalesOrderIsCompleted, setIsSalesOrderIsCompleted] = useState(false);
  const [imagesBento, setImageBento] = useState<Images[]>([]);

  return (
    <OrderContext.Provider
      value={{
        isWithdrawal,
        setIsWithdrawal,
        isSalesOrderIsCompleted,
        setIsSalesOrderIsCompleted,
        imagesBento,
        setImageBento,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
