import { useFormContext } from "react-hook-form";
import { PropsType } from "../../../types";

// import { Bank } from "phosphor-react";

interface PropsOptions extends PropsType {
  option: string;
  optionDescribe?: string;
  nameField: string;
}

export function Option({ option, nameField, optionDescribe }: PropsOptions) {
  // const { option, optionDescribe, nameField } = props;

  const { register } = useFormContext();

  return (
    <div>
      <input
        // name={nameField}
        type="radio"
        defaultValue={option}
        className="hidden peer"
        id={option}
        {...register(`${nameField}`)}
      />
      <label
        className="inline-flex w-full flex-col p-2 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
        htmlFor={option}
      >
        <div>
          <div className="flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-baseInput text-center">
              {option}
            </h3>
            <p className="text-baseInput text-center">{optionDescribe}</p>
          </div>
        </div>
      </label>
    </div>
  );
}
