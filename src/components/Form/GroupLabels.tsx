import { ReactNode, forwardRef } from "react";
import { PropsType } from "../../types";

interface PropsGroupLaber extends PropsType {
  title?: string;
  describe?: string;
  simple?: boolean;
  children: ReactNode;
  innerRef?: any;
}

const GroupLabels = forwardRef((props: PropsGroupLaber, ref: any) => {
  const { simple, title, describe, children, innerRef } = props;

  return simple == true ? (
    <div
      className=" bg-baseInput  border border-baseButton p-2 space-y-2 text-baseText placeholder-baseLabel rounded-lg leading-none "
      ref={ref}
    >
      <h2 className="font-bold text-baseText text-xl">{title}</h2>
      <span className="text-sm">{describe}</span>
      {children}
    </div>
  ) : (
    <div
      ref={ref}
      className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 space-y-2 xl:flex xl:flex-wrap xl:items-baseline xl:space-x-3 "
    >
      <div>
        <h2 className="font-bold text-baseText text-xl">{title}</h2>
        <span className="text-sm">{describe}</span>
      </div>
      {children}
    </div>
  );
});

export { GroupLabels };
