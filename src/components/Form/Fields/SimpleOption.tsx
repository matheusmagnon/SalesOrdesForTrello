import { useFormContext } from "react-hook-form";
import { PropsType } from "../../../types";
import { ChangeEvent, useContext } from "react";
import { OrderContext } from "../../../context/SalesOrderContext";

interface PropsSimpleOptions extends PropsType {
  option: string;
  nameField: string;
}

export function SimpleOption(props: PropsSimpleOptions) {
  const { register } = useFormContext();
  const { setIsWithdrawal } = useContext(OrderContext);
  const { option, nameField } = props;

  const handleisWithdrawalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsWithdrawal?.(event.target.value);
  };

  return nameField == "isWithdrawal" ? (
    <li>
      <input
        type="radio"
        defaultValue={option}
        className="hidden peer"
        id={option}
        {...register(`${nameField}`, {
          onChange: (e) => {
            handleisWithdrawalChange(e);
          },
        })}
      />

      <label
        className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
    cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
        htmlFor={option}
      >
        {option}
      </label>
    </li>
  ) : (
    <li>
      <input
        type="radio"
        defaultValue={option}
        className="hidden peer"
        id={option}
        {...register(`${nameField}`)}
      />

      <label
        className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
    cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
        htmlFor={option}
      >
        {option}
      </label>
    </li>
  );
}
