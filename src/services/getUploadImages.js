import { useState } from 'react';
import getImageArray from './getImageArray';
// const [images, setImage] = useState([]);

export default function getUploadImages(events) {
  const imagesPreview = getImageArray(events);
  const images = imagesPreview.map(file => {
    const { name, size } = file;
    return { name, size, URLpreview: URL.createObjectURL(file) };
  });
  handleImages(images);
}
