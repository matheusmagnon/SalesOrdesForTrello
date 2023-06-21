import React from "react";

type TitleProps = {
  children: React.ReactNode;
};

export function Title(props: TitleProps) {
  return (
    <h1
      className="text-2xl font-bold text-center text-fuchsia-950
          sm:text-4xl lg:text-5xl"
    >
      {props.children}
    </h1>
  );
}
