import React, { useState } from 'react';
import { Contact } from '../types';
import checkIcon from "../assets/icon/check-icon.svg";
import closeIcon from "../assets/icon/close-icon.svg";

interface ContactDialogProps {
  contact: Contact;
  onClose: () => void;
  onSave: (data: { person: string; phoneNumber: string; email: string }) => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ contact, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    person: `${contact.firstname} ${contact.lastname}`,
    phoneNumber: contact.phone,
    email: contact.email
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="contact-dialog">
      {/* Header */}
      <div className="contact-dialog__header">
        <h2 className="contact-dialog__title">Contacts</h2>
        <div className="contact-dialog__actions">
          <button 
            className="contact-dialog__button contact-dialog__button--save" 
            onClick={handleSave}
          >
            <img src={checkIcon} alt="Save" />
            Save changes
          </button>
          <button 
            className="contact-dialog__button contact-dialog__button--cancel" 
            onClick={onClose}
          >
            <img src={closeIcon} alt="Cancel" />
            Cancel
          </button>
        </div>
      </div>
      
      {/* Form */}
      <div className="contact-dialog__form">
        <div className="contact-dialog__field">
          <label className="contact-dialog__label">Responsible person:</label>
          <input
            type="text"
            name="person"
            value={formData.person}
            onChange={handleChange}
            className="contact-dialog__input"
          />
        </div>
        
        <div className="contact-dialog__field">
          <label className="contact-dialog__label">Phone number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="contact-dialog__input"
          />
        </div>
        
        <div className="contact-dialog__field">
          <label className="contact-dialog__label">E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="contact-dialog__input"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDialog; 