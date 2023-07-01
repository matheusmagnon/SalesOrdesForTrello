import getDateNow from "../../../services/getDateNow";

export function DateField() {
  return (
    <div className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg p-2 flex-col">
      <div>
        <strong>Selecione a data e horário da Retirada:</strong>
        {/* {isWithdrawal} */}
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
        value={getDateNow()}
        // name="dateTimeInOrder"
        // {...register("dateTimeInOrder", {
        //   value: getDateNow(),
        // })}
      />
      {/* <p className={styles.errorMessage}>{erroIsWithdrawalOrDelivery()}</p> */}
    </div>
  );
}
