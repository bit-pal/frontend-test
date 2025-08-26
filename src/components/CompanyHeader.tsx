import React from "react";
import chevronLeftIcon from "../assets/icon/chevron-left-icon.svg";
import editIcon from "../assets/icon/edit-icon.svg";
import redTrashIcon from "../assets/icon/red-trash-icon.svg";

interface CompanyHeaderProps {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ name, onEdit, onDelete }) => {
  return (
         <div className="company-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div className="company-header__left" style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                   <img 
             src={chevronLeftIcon} 
             alt="Back" 
             className="company-header__icon company-header__icon--back" 
             style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', paddingTop: '0.5rem'}}
           />
          <h2 className="company-header__title" style={{ fontSize: '2rem', fontWeight: '600', margin: 0 }}>{name}</h2>
       </div>
      <div className="company-header__actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          className="company-header__button" 
          onClick={onEdit}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: '0.5rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <img 
            src={editIcon} 
            alt="Edit" 
            className="company-header__icon company-header__icon--edit" 
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </button>
        <button 
          className="company-header__button" 
          onClick={onDelete}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: '0.5rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
                     <img 
             src={redTrashIcon} 
             alt="Delete" 
             className="company-header__icon company-header__icon--delete" 
             style={{ width: '2rem', height: '2rem' }}
           />
        </button>
      </div>
    </div>
  );
};

export default CompanyHeader; 