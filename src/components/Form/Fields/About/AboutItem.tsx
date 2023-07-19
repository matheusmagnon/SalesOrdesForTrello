import { PropsType } from "../../../../types";

export function AboutItem(props: PropsType) {
  return <li className="xl:pr-4"> • {props.children}</li>;
}
