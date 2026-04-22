import React, { useState } from 'react';
import { MdCameraAlt, MdSync } from 'react-icons/md';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePictureUpload() {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const { data } = await API.post('/upload/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data.success) {
        updateUser({ ...user, profilePicture: data.imageUrl });
        alert('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg shrink-0">
        <img 
          alt="Profile" 
          className="w-full h-full object-cover" 
          src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=004ac6&color=fff&size=128`}
        />
      </div>
      
      <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
        {uploading ? <MdSync className="text-lg animate-spin" /> : <MdCameraAlt className="text-lg" />}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
      </label>
    </div>
  );
}
