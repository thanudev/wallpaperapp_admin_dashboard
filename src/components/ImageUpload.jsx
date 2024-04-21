import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/utils/firebase";

function ImageUpload({ handleGetImageUrl }) {
  const storage = getStorage(app);

  const [selectedFile, setselectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setselectedFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    const name = new Date().getTime() + file.name;

    const storageRef = ref(storage, `WallpaperApp/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleGetImageUrl(downloadURL);
          setImageUrl(downloadURL);
          setLoading(false);
        });
      }
    );
  };
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div>
            Image Uploading... {"  "} {parseInt(uploadPercentage)} %
          </div>
        </div>
      )}
      <input
        accept="image/*"
        onChange={handleImageUpload}
        type="file"
        className="pb-4 p-2 border border-gray-300 w-full mt-3"
      />
      {selectedFile && (
        <div>
          <img src={selectedFile} alt="" className="h-40 w-30 pb-5" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
