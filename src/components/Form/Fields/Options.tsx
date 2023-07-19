import { PropsType } from "../../../types";

// import { Bank } from "phosphor-react";

interface PropsOptions extends PropsType {
  option: string;
  optionDescribe?: string;
  nameField: string;
}

export function Options(props: PropsOptions) {
  return (
    <li>
      <input
        type="radio"
        name={props.nameField}
        value={props.option}
        className="hidden peer"
        id={props.option}

        // className="hidden"
        // id={props.option}
        // value={props.option}
        // type="radio"
        // {...register("flavorInOrder")}
      />
      <label
        className="inline-flex w-full flex-col p-1 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
        htmlFor={props.option}
      >
        <div>
          <div>{/* <Bank size={20} /> */}</div>
          <div className="flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-baseInput text-center">
              {props.option}
            </h3>
            <p className="text-baseInput text-center">{props.optionDescribe}</p>
          </div>
        </div>
      </label>
      {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
    </li>
  );
}
