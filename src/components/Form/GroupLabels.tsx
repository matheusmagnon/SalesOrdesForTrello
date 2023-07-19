import { ReactNode } from "react";
import { PropsType } from "../../types";

interface PropsGroupLaber extends PropsType {
  simple?: boolean;
  children: ReactNode;
}

export function GroupLabels(props: PropsGroupLaber) {
  const { simple } = props;
  return simple == true ? (
    <div className=" bg-baseInput  border border-baseButton p-2 space-y-2 text-baseText placeholder-baseLabel rounded-lg leading-none ">
      {/* // bg-baseCard border border-grupButtonsBorder */}
      {props.children}
    </div>
  ) : (
    <div className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 space-y-2 xl:flex xl:flex-wrap xl:items-baseline xl:space-x-3 ">
      {/* bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel */}
      {props.children}
    </div>
  );
}
