import React, { useState } from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);

  const handleUpload = (event) => {
    // Handle the image upload here
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
      <CloudinaryContext cloudName="your_cloud_name">
        {images.map((image, index) => (
          <Image key={index} publicId={image.public_id}>
            <Transformation width="150" height="150" crop="thumb" />
          </Image>
        ))}
      </CloudinaryContext>
    </div>
  );
};

export default ImageUploadForm;
