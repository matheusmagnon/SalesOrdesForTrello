import styles from './Form.module.css';

export default function PreviewImageUpload({ name, URLpreview }) {
  return (
    <div className={styles.fieldPreview}>
      <div>
        <span>{name}</span>
        <img src={URLpreview} key={name} />
      </div>
    </div>
  );
}
