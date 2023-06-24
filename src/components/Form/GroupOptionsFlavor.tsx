type PropsGroupOptionsFlavor = {
  children?: React.ReactNode;
};

export function GroupOptionsFlavor(props: PropsGroupOptionsFlavor) {
  return (
    <div className="w-full py-3 bg-baseCard border-solid border-2 border-grupButtonsBorder rounded-lg px-1 mt-2 space-y-2">
      {props.children}
    </div>
  );
}
