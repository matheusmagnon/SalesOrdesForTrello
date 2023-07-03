import { PropsType } from "../../../types";

interface PropsTextField extends PropsType {
  placeholder: string;
}

export function TextField(props: PropsTextField) {
  return (
    <div>
      {/* <label> */}
      <input
        type="text"
        id="POST-name"
        defaultValue=""
        // name="nameInOrder"
        //   {...register("nameInOrder")}
        placeholder={`${props.placeholder}`}
        // autoFocus
        className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
      />
      {/* </label> */}
      {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
    </div>
  );
}
