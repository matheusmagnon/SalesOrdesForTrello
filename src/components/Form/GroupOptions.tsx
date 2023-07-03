import { PropsType } from "../../types";

interface PropsGruopOptions extends PropsType {
  type?: string;
}

export function GroupOptions(props: PropsGruopOptions) {
  return props.type == "simple" ? (
    <ul className="flex space-x-2 mt-1">{props.children}</ul>
  ) : (
    <ul className="flex-col self-center space-y-2">{props.children}</ul>
  );
}

{
  /*  */
}
