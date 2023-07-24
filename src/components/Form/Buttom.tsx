import { useForm } from "react-hook-form";

interface PropsButtom {
  content: string;
  color?: string;
}
export function Buttom(props: PropsButtom) {
  const {
    formState: { errors },
  } = useForm();
  let { color, content } = props;

  return color == "verde" ? (
    <input
      className="bg-green-800 rounded-md px-4 py-1 mt-3 text-xl text-white cursor-pointer"
      type="submit"
      value={content}
    />
  ) : (
    <input
      className="bg-fuchsia-950 rounded-md px-4 py-1 mt-3 text-xl text-white cursor-pointer"
      type="submit"
      value={content}
    />
  );
}
