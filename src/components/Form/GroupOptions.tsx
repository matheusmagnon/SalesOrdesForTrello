import { PropsType } from "../../types";

interface PropsGruopOptions extends PropsType {
  simple?: boolean;
}

export function GroupOptions(props: PropsGruopOptions) {
  return props.simple == true ? (
    <ul className="flex space-x-2 mt-1">{props.children}</ul>
  ) : (
    <ul className="flex-col self-center space-y-2 xl:flex xl:flex-row xl:space-x-10 items-baseline ">
      {props.children}
    </ul>
  );
}

{
  /*  */
}
