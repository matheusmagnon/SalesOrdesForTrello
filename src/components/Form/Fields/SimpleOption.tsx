import { PropsType } from "../../../types";

interface PropsSimpleOptions extends PropsType {
  option: string;
}

export function SimpleOption(props: PropsSimpleOptions) {
  //   props.option == "candleInOrder";
  return (
    <li>
      <input
        type="radio"
        name="candleInOrder"
        value={props.option}
        className="hidden peer"
        id={props.option}
        // name="candleInOrder"
        // defaultValue={props.option}
        // onChange={(e) => {
        //   console.log(event?.target);
        // }}
      />

      <label
        className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl cursor-pointer
        peer-checked:bg-fuchsia-900 hover:bg-fuchsia-800"
        htmlFor={props.option}
      >
        {" "}
        {props.option}
      </label>
    </li>
  );
}
