import { PropsType } from "../../../../types";

interface PropsAbout extends PropsType {
  title: string;
  item?: string;
}
export function About(props: PropsAbout) {
  return (
    <div className="bg-baseCard border border-grupButtonsBorder p-2 mt-2 rounded-lg xl:flex xl:flex-col xl:items-center">
      <h1 className="font-bold text-baseText text-xl">{props.title}</h1>
      <ul className="xl:flex xl:flex-wrap">
        <li className="xl:pr-4"> • cobertura de buttercream</li>
        <li className="xl:pr-4">
          • acompanha talher de madeira e embalagem biodegradáveis
        </li>
        <li className="xl:pr-4"> • 1 camada de recheio</li>
        <li className="xl:pr-4"> • 2 camadas de massa</li>
        <li className="xl:pr-4"> • 10 cm de diâmetro</li>
        <li className="xl:pr-4"> • serve 2 fatias</li>
      </ul>
    </div>
  );
}
