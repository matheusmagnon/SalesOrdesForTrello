import { useContext } from "react";
import getDateNow from "../../../utils/getDateNow";
import { useFormContext } from "react-hook-form";
import { OrderContext } from "../../../context/SalesOrderContext";

export function DateField() {
  const { isWithdrawal } = useContext(OrderContext);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function erroIsWithdrawalOrDelivery() {
    if (errors.dateTimeInOrder?.message) {
      return errors.dateTimeInOrder?.message + `${isWithdrawal}`;
    }
  }

  return (
    <div className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg p-2 flex-col">
      <div>
        <strong className="text-xl">
          Selecione a data e horário da {isWithdrawal}:
        </strong>
      </div>
      <div>
        <span>Segunda à Sexta das 12:00 às 18:30</span>
      </div>
      <div>
        <span>SÁBADO 10:00 às 12:00</span>
      </div>

      <input
        className="bg-fuchsia-950 p-2  rounded-xl text-white"
        type="datetime-local"
        defaultValue={getDateNow()}
        {...register("dateTimeInOrder")}
      />
      <p className="text-red-500 ltext-sm">{erroIsWithdrawalOrDelivery()}</p>
    </div>
  );
}
