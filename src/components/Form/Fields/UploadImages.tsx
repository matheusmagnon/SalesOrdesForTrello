export function UploadImages() {
  return (
    <div>
      <label className="bg-fuchsia-950 p-1 w-full text-white block rounded-xl cursor-pointer text-center duration-75">
        Caso haja alguma imagem de inspiração anexe aqui
        <input
          className="hidden"
          type="file"
          multiple
          accept="image/*"
          // name="filesInOrder"
          // {...register("filesInOrder", {
          //   onChange: (e) => {
          //     getImagesToUpload(e);
          //   },
          // })}
        />
      </label>
    </div>
  );
}
