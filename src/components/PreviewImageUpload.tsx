import styles from "./Form.module.css";
type PropPreview = {
  name: string;
  URLpreview: string;
};
export default function PreviewImageUpload({ name, URLpreview }: PropPreview) {
  return (
    <div className="w-20">
      <div>
        <span className="text-xs">{name}</span>
        <img src={URLpreview} key={name} />
      </div>
    </div>
  );
}
