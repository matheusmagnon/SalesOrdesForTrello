import { PropsType } from "../../types";

export function FormBackground(props: PropsType) {
  return (
    <div className="bg-backgroundPage p-3 md:p-5 w-full flex justify-center">
      {props.children}
    </div>
  );
}
