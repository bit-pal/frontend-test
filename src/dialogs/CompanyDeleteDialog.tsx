import React from 'react';

interface CompanyDeleteDialogProps {
  onCancel: () => void;
  onSave: () => void;
}

const CompanyDeleteDialog: React.FC<CompanyDeleteDialogProps> = ({ onCancel, onSave }) => {
  return (
    <div className="dialog">
      <div>
        <div className="dialog__header">
          <h2 className="dialog__title">
            Remove the organization?
          </h2>
        </div>
        <h2>Are you sure you want to remove this organization?</h2>
      </div>
      <div className="dialog__actions">
        <button
          onClick={onCancel}
          className="dialog__button dialog__button--cancel"
        >
          No
        </button>
        <button
          onClick={onSave}
          className="dialog__button dialog__button--save"
        >
          Yes, remove
        </button>
      </div>
    </div>
  );
};

export default CompanyDeleteDialog; 