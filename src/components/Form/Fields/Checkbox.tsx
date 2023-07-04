import { PropsType } from "../../../types";

interface PropsCheckbox extends PropsType {
  content: string;
  nameField: string;
}

export function Checkbox(props: PropsCheckbox) {
  return (
    <div>
      <label>
        <input
          className="accent-fuchsia-900 focus:accent-fuchsia-900"
          type="checkbox"
          id={props.nameField}
          //   value={true}
          //   {...register("awareOfWhatsApp")}
          // onChange={handleOnChange}
        />
        <span className="pl-1 text-end">{props.content}</span>
        {/* Estou ciente que o pedido será concluido via WhatsApp */}
      </label>
      {/* <p className={styles.errorMessage}>{errors.awareOfWhatsApp?.message}</p> */}
    </div>
  );
}
