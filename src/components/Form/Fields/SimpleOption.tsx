import { PropsType } from "../../../types";

interface PropsSimpleOptions extends PropsType {
  option: string;
}

export function SimpleOption(props: PropsSimpleOptions) {
  return (
    <label
      className=" pt-1 px-2 mr-4 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg 
    hover:bg-fuchsia-900 shadow-2xl text-white"
      htmlFor={props.option}
    >
      <input
        className="hidden"
        type="radio"
        id="POST-velaSim"
        // name="candleInOrder"
        value={props.option}
      />{" "}
      {props.option}
    </label>
  );
}
