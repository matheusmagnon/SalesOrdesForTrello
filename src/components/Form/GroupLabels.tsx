import { PropsType } from "../../types";

interface PropsGroupLaber extends PropsType {
  type?: string;
}

export function GroupLabels(props: PropsGroupLaber) {
  return props.type == "simple" ? (
    <div
      className="
    bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel rounded-lg leading-none"
    >
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
