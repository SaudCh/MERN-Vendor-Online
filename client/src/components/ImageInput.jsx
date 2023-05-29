import React, { useRef, useState } from "react";

export default function AddImage({ setImage, link, error }) {
  const [preview, setPreview] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const imgRef = useRef();

  const validateFile = (file) => {
    const validTypes = ["image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const fileIsValid = validateFile(file);
    setIsValid(fileIsValid);
    if (fileIsValid) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <figure
        className={
          "bg-white m-0 border rounded" + (error ? " border-red-400" : "")
        }
        style={{ width: 150, height: 150 }}
      >
        {isValid ? (
          <img
            src={preview}
            alt="Profile"
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <img
            src={
              link
                ? link
                : "https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"
            }
            alt="Profile"
            className="w-full h-full rounded"
            style={{ objectFit: "cover" }}
          />
        )}
      </figure>
      <input
        type="file"
        ref={imgRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={handleImageChange}
      />
      <button
        className={
          "btn bg-light m-0 border py-1 rounded" +
          (error ? " border-red-400" : "")
        }
        style={{ width: 150 }}
        type="button"
        onClick={() => imgRef.current.click()}
      >
        Add Photo
      </button>
      {error && <p className="text-red-400 text-xs italic">{error}</p>}
    </div>
  );
}
