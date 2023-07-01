import { PropsState, PropsType } from "../../types";

export function GroupInputs(props: PropsType) {
  return (
    <div className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 space-y-2 ">
      {props.children}
    </div>
  );
}
