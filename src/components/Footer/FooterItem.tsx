import { PropsType } from "../../types";

export function FooterItem(props: PropsType) {
  return (
    <li className="pt-2">
      <a href="#" className="font-dmSans text-base text-footerOptions">
        {props.children}
      </a>
    </li>
  );
}
