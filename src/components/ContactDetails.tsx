import React from "react";
import { Field } from "../types";
import editIcon from "../assets/icon/edit-icon.svg";

interface ContactDetailsProps {
  title: string;
  fields: Field[];
  onEdit: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ title, fields, onEdit }) => (
  <div className="details">
    <div className="details__header">
      <h3 className="details__title">{title}</h3>
      <button className="details__edit-button" onClick={onEdit}>
        <img src={editIcon} alt="Edit" style={{ width: '1rem', height: '1rem' }} />
        Edit
      </button>
    </div>
    <div className="details__content">
      {fields.map(({ label, value }, idx) => (
        <div key={idx} className="details__field">
          <span className="details__field-label">{label}</span>
          <span className="details__field-value">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ContactDetails; 