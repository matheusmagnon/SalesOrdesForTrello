import { useFormContext } from "react-hook-form";
import { PropsType } from "../../../types";

import { twMerge } from "tailwind-merge";
import { FC, HTMLAttributes } from "react";

interface PropsTextField extends React.HTMLAttributes<HTMLElement> {
  placeholder: string;
  nameField: string;
}

export function TextField({ placeholder, nameField, ...rest }: PropsTextField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // props.isOptinal == true
  //   ? (props.placeholder = "Opcional")
  //   : (props.placeholder = "ok");

  const field = nameField;
  return (
    <div {...rest} className={twMerge("xl:w-full", rest.className)}>
      <input
        type="text"
        id="POST-name"
        {...register(`${nameField}`)}
        placeholder={placeholder}
        className="bg-baseInput  border border-baseButton  text-baseText  placeholder-baseLabel text-base xl:text-sm rounded-lg
       focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
      />
      <p className="text-red-500 text-sm">
        {errors?.[nameField]?.message?.toString()}
      </p>
    </div>
  );
}
