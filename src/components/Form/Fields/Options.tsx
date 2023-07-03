import { PropsType } from "../../../types";

interface PropsOptions extends PropsType {
  option: string;
  optionDescribe?: string;
}

export function Options(props: PropsOptions) {
  return (
    <li>
      <input
        type="radio"
        name="flavor"
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
        className="flex flex-col p-1 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 hover:bg-fuchsia-900 shadow-2xl"
        htmlFor={props.option}
      >
        {/* <span className="text-xs font-semibold uppercase">Small</span> */}
        <h3 className="text-xl font-bold mt-2 text-baseInput text-center">
          {props.option}
        </h3>
        <p className="text-baseInput text-center">{props.optionDescribe}</p>
      </label>
      {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
    </li>
  );
}
