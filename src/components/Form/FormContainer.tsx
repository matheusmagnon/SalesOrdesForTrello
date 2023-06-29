import { PropsType } from "../../types";

export function FormContainer(props: PropsType) {
  return (
    <div className=" bg-white px-3 py-3 rounded-md shadow-container max-w-6xl  md:px-10">
      {props.children}
    </div>
  );
}
