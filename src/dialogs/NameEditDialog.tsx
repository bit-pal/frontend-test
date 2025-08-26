import React, { useState } from 'react';

interface NameEditDialogProps {
  name: string;
  onCancel: () => void;
  onSave: (name: string) => void;
}

const NameEditDialog: React.FC<NameEditDialogProps> = ({ name, onCancel, onSave }) => {
  const [inputValue, setInputValue] = useState<string>(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div className="dialog">
      <div>
        <div className="dialog__header">
          <h1 className="dialog__title">
            Specify the Organization&apos;s name
          </h1>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="dialog__input"
        />
      </div>
      <div className="dialog__actions">
        <button
          onClick={onCancel}
          className="dialog__button dialog__button--cancel"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="dialog__button dialog__button--save"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NameEditDialog; 