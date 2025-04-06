const PRESENT_NAME = "food-delivery";
const CLOUDINARY_NAME = "728498412411343";

export const handleUpload = async (file: File | null) => {
  if (!file) {
    alert("PLease Select a File");
    return;
  }
  console.log("ajilj ehellee");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESENT_NAME);
  formData.append("api_key", CLOUDINARY_NAME);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();
    return result.secure_url;
  } catch (err) {
    console.log(err);
    alert("failed to upload file");
  }
};
