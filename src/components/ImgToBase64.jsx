import { useEffect, useState } from "react";
import React from "react";

const ImgToBase64 = ({ setImage, index }) => {
  if (index === undefined) {
    index = "";
  }
  const blobToBase64 = async (blob) => {
    var file = blob.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const handleFile = (file) => {
    debugger;
    blobToBase64(file).then((res) => {
      setImage(res, index);
      // console.log(res);
    });
  };

  return (
    <>
      <input
        type="file"
        id={`img-input${index}`}
        onChange={(file) => handleFile(file)}
      />
    </>
  );
};

export default ImgToBase64;
