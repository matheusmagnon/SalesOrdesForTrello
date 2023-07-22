import { useState } from "react";
import { useFormContext } from "react-hook-form";
import PreviewImageUpload from "../../PreviewImageUpload";
import { v4 as uuidv4 } from "uuid";

type Images = {
  name: string;
  size: number;
  URLpreview: string;
};

export function UploadImages() {
  const [images, setImage] = useState<Images[]>([]);
  const { register } = useFormContext();

  const getImagesToUpload = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const imagesPreview = Array.from(target.files as FileList);

    interface File {
      name: string;
      size: number;
    }

    const images = imagesPreview.map((file) => {
      const { name, size }: File = file;
      return { name, size, URLpreview: URL.createObjectURL(file) };
    });
    setImage(images);
  };

  return (
    <div className="xl:w-36">
      <label className="bg-fuchsia-950 p-2 text-white block rounded-xl cursor-pointer text-center duration-75">
        Caso haja alguma imagem de inspiração anexe aqui
        <input
          className="hidden"
          type="file"
          multiple
          accept="image/*"
          {...register("filesInOrder", {
            onChange: (e) => {
              getImagesToUpload(e);
            },
          })}
        />
      </label>
      <div className="xl:w-96">
        <div className="w-full flex flex-wrap space-x-4">
          {images.map((image) => {
            return (
              <PreviewImageUpload
                key={uuidv4()}
                name={image.name}
                URLpreview={image.URLpreview}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
