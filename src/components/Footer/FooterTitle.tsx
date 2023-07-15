import { ReactNode } from "react";
import { PropsType } from "../../types";

interface PropsFooterTitle extends PropsType {
  children: ReactNode;
}

export function FooterTitle(props: PropsFooterTitle) {
  return (
    <h3 className="font-dmSans text-xl text-footerTitle font-bold">
      {props.children}
    </h3>
  );
}
