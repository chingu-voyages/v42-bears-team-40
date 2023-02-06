import axios from 'axios';

export const handleUpdatePhoto = async (
  imageRef,
  id,
  handleSetImage,
  setUpdatePhoto
) => {
  const file = imageRef.current.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bpa2smys');
  const postImage = async () => {
    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/ljmccode/image/upload',
        formData
      );
      const newImage = data.secure_url;
      const response = await fetch(`/api/seller-image/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage),
      });
      const { user } = await response.json();
      handleSetImage(user.image);
      setUpdatePhoto(false);
    } catch (error) {
      console.error(error);
    }
  };
  postImage();
};
