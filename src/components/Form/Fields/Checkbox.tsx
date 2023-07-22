import { useFormContext } from "react-hook-form";
import { PropsType } from "../../../types";

interface PropsCheckbox extends PropsType {
  content: string;
  nameField: string;
}

export function Checkbox({ content, nameField }: PropsCheckbox) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label>
        <input
          className="accent-fuchsia-900 focus:accent-fuchsia-900"
          type="checkbox"
          id="accept"
          //   value={true}
          {...register(`${nameField}`)}
          // onChange={handleOnChange}
        />
        <span className="pl-1 text-end">{content}</span>
        {/* Estou ciente que o pedido será concluido via WhatsApp */}
      </label>
      <p className="text-red-500 text-sm pt-1">
        {errors?.[nameField]?.message?.toString()}
      </p>
    </div>
  );
}
