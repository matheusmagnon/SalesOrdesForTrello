import { ReactNode } from "react";
import { PropsType } from "../../types";

interface PropsGroupLaber extends PropsType {
  type?: string;
  children: ReactNode;
}

export function GroupLabels(props: PropsGroupLaber) {
  const { type } = props;
  return type == "simple" ? (
    <div className=" bg-baseInput  border border-baseButton p-1 space-y-2 text-baseText placeholder-baseLabel rounded-lg leading-none">
      {/* // bg-baseCard border border-grupButtonsBorder */}
      {props.children}
    </div>
  ) : (
    <div className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 space-y-2 ">
      {/* bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel */}
      {props.children}
    </div>
  );
}
