import React, { useState } from "react";

type Props = {
    name?: string
};

const UploadImage = ({name}: Props) => {
  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <React.Fragment>
      <div className="mb-3">
        <label className="me-3">Upload Image</label>
        <input type="file" name={name} onChange={handleFileChange} accept="image/*" />{" "}
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ width: "100px", height: "100px" }}
          />
        )}{" "}
      </div>
    </React.Fragment>
  );
};

export default UploadImage;
