import { PropsType } from "../../../types";

interface PropsSimpleOptions extends PropsType {
  option: string;
  nameField: string;
}

export function SimpleOption(props: PropsSimpleOptions) {
  //   props.option == "candleInOrder";
  return (
    <li>
      <input
        type="radio"
        name={props.nameField}
        value={props.option}
        className="hidden peer"
        id={props.option}
        onChange={(e) => console.log(e.target.value)}
        // name="candleInOrder"
        // defaultValue={props.option}
        // onChange={(e) => {
        //   console.log(event?.target);
        // }}
      />

      <label
        className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl cursor-pointer
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
        htmlFor={props.option}
      >
        {" "}
        {props.option}
      </label>
    </li>
  );
}
