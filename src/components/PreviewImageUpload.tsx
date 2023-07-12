import styles from "./Form.module.css";
type PropPreview = {
  name: string;
  URLpreview: string;
};
export default function PreviewImageUpload({ name, URLpreview }: PropPreview) {
  return (
    <div className="xl:flex xl:flexrow xl:flex-wrap xl:items-baseline xl:space-x-2 w-32">
      <div>
        <span className="text-sm">{name}</span>
        <img src={URLpreview} key={name} />
      </div>
    </div>
  );
}
