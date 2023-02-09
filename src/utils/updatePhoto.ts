import axios from 'axios';
import { MutableRefObject } from 'react';

const uploadPhoto = async (imageRef) => {
  if (imageRef.current.files[0]) {
    const file = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'bpa2smys');
    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/ljmccode/image/upload',
        formData
      );
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  } else {
    return false;
  }
};

export const handleProfilePhoto = async (
  imageRef: MutableRefObject<HTMLInputElement>,
  id,
  handleSetImage,
  setUpdatePhoto
) => {
  const newImage = await uploadPhoto(imageRef);
  if (!newImage) {
    setUpdatePhoto(false);
    return;
  }
  const postProfileImage = async () => {
    try {
      const response = await fetch(`/api/seller/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: newImage, type: 'update-image' }),
      });
      const { user } = await response.json();
      handleSetImage(user.image);
      setUpdatePhoto(false);
    } catch (error) {
      console.error(error);
    }
  };
  postProfileImage();
};

export const handleImagePhoto = async (imageRef, itemId) => {
  const newImage = await uploadPhoto(imageRef);
  if (!newImage) return;
  const updateItemImage = async () => {
    try {
      await fetch(`/api/item-image/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage),
      });
    } catch (error) {
      console.error(error);
    }
  };
  updateItemImage();
};
