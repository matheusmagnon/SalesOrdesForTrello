type ContainerProps = {
  children: React.ReactNode;
};

export function ContainerForm(props: ContainerProps) {
  return (
    <div
      style={{ boxShadow: "insert 0 0 1rem black , 0 0 1rem black" }}
      className=" bg-gray-100 rounded- px-5 py-3 max-w-5xl flex-col shadow-container
    md:mx-8"
    >
      {props.children}
    </div>
  );
}

// box-shadow: inset 0 0 1rem black, 0 0 1rem black;
