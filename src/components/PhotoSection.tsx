import React from "react";
import { Photo } from "../types";
import trashIcon from "../assets/icon/trash-icon.svg";
import addPhotoIcon from "../assets/icon/add-photo-icon.svg";

interface PhotoSectionProps {
  photos: Photo[];
  onUpload: (file: File) => void;
  onDelete: (imageName: string) => void;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ photos, onUpload, onDelete }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="photo-section">
      <div className="photo-section__header">
        <h3 className="photo-section__title">Photos</h3>
        <label className="photo-section__add-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={addPhotoIcon} alt="Add Photo" style={{ width: '1rem', height: '1rem' }} />
          <input 
            type="file" 
            className="photo-section__file-input"
            onChange={handleFileChange}
            accept="image/*"
          />
          Add
        </label>
      </div>
      <div className="photo-section__photos">
        {photos.map((photo) => (
          <div key={photo.name} className="photo-section__photo">
            <img 
              src={photo.thumbpath} 
              alt="thumbnail" 
              className="photo-section__photo-image" 
            />
            <button
              className="photo-section__delete-button"
              onClick={() => onDelete(photo.name)}
            >
              <img 
                src={trashIcon} 
                alt="Delete" 
                className="photo-section__delete-icon" 
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSection; 