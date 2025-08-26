import React, { useState, useEffect, useRef } from "react";
import { Organization } from "../types";
import closeIcon from "../assets/icon/close-icon.svg";
import checkIcon from "../assets/icon/check-icon.svg";
import arrowDownIcon from "../assets/icon/arrow-down.svg";
import arrowUpIcon from "../assets/icon/arrow-up.svg";

interface OrganizationDialogProps {
  organization: Organization;
  onClose: () => void;
  onSave: (data: {
    agreementNumber: string;
    agreementDate: string;
    businessEntity: string;
    type: string[];
  }) => void;
}

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  organization,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    agreementNumber: organization.contract.no,
    agreementDate: organization.contract.issue_date ? new Date(organization.contract.issue_date).toISOString().split('T')[0] : '',
    businessEntity: organization.businessEntity,
    type: organization.type,
  });

  const [isBusinessEntityDropdownOpen, setIsBusinessEntityDropdownOpen] = useState(false);
  const [isCompanyTypeDropdownOpen, setIsCompanyTypeDropdownOpen] = useState(false);

  const businessEntityRef = useRef<HTMLDivElement>(null);
  const companyTypeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (businessEntityRef.current && !businessEntityRef.current.contains(event.target as Node)) {
        setIsBusinessEntityDropdownOpen(false);
      }
      if (companyTypeRef.current && !companyTypeRef.current.contains(event.target as Node)) {
        setIsCompanyTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const businessEntities = [
    "Partnership",
    "Corporation",
    "LLC",
    "Sole Proprietorship",
    "Non-profit"
  ];

  const companyTypes = [
    { name: "Funeral Home", indicator: "funeral_home" },
    { name: "Logistics Services", indicator: "logistics_services" },
    { name: "Healthcare Provider", indicator: "burial_care_contractor" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessEntitySelect = (entity: string) => {
    setFormData((prev) => ({ ...prev, businessEntity: entity }));
    setIsBusinessEntityDropdownOpen(false);
  };

  const handleCompanyTypeToggle = (typeIndicator: string) => {
    setFormData((prev) => {
      const isSelected = prev.type.includes(typeIndicator);
      const updatedTypes = isSelected
        ? prev.type.filter((type) => type !== typeIndicator)
        : [...prev.type, typeIndicator];
      return { ...prev, type: updatedTypes };
    });
  };

  const getSelectedCompanyTypeNames = () => {
    return companyTypes
      .filter(type => formData.type.includes(type.indicator))
      .map(type => type.name)
      .join(", ");
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="organization-dialog">
      {/* Header */}
      <div className="organization-dialog__header">
        <h2 className="organization-dialog__title">Company Details</h2>
        <div className="organization-dialog__actions">
          <button
            className="organization-dialog__button organization-dialog__button--save"
            onClick={handleSave}
          >
            <img src={checkIcon} alt="Save" />
            Save changes
          </button>
          <button
            className="organization-dialog__button organization-dialog__button--cancel"
            onClick={onClose}
          >
            <img src={closeIcon} alt="Cancel" />
            Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="organization-dialog__form">
        <div className="organization-dialog__row">
          <div className="organization-dialog__field">
            <label className="organization-dialog__label">Agreement number:</label>
            <input
              type="text"
              name="agreementNumber"
              value={formData.agreementNumber}
              onChange={handleChange}
              className="organization-dialog__input"
            />
          </div>
          <div className="organization-dialog__field">
            <label className="organization-dialog__label">Date:</label>
            <input
              type="date"
              name="agreementDate"
              value={formData.agreementDate}
              onChange={handleChange}
              className="organization-dialog__input"
            />
          </div>
        </div>

        <div className="organization-dialog__field organization-dialog__field--full-width">
          <label className="organization-dialog__label">Business entity:</label>
          <div className="organization-dialog__dropdown" ref={businessEntityRef}>
            <button
              type="button"
              className="organization-dialog__dropdown-button"
              onClick={() => setIsBusinessEntityDropdownOpen(!isBusinessEntityDropdownOpen)}
            >
              {formData.businessEntity}
              <img
                src={isBusinessEntityDropdownOpen ? arrowUpIcon : arrowDownIcon}
                alt="dropdown arrow"
                className="organization-dialog__dropdown-arrow"
              />
            </button>
            {isBusinessEntityDropdownOpen && (
              <div className="organization-dialog__dropdown-menu">
                {businessEntities.map((entity) => (
                  <button
                    key={entity}
                    type="button"
                    className="organization-dialog__dropdown-item"
                    onClick={() => handleBusinessEntitySelect(entity)}
                  >
                    {entity}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="organization-dialog__field organization-dialog__field--full-width">
          <label className="organization-dialog__label">Company type:</label>
          <div className="organization-dialog__dropdown" ref={companyTypeRef}>
            <button
              type="button"
              className="organization-dialog__dropdown-button"
              onClick={() => setIsCompanyTypeDropdownOpen(!isCompanyTypeDropdownOpen)}
            >
              {getSelectedCompanyTypeNames() || "Select company types"}
              <img
                src={isCompanyTypeDropdownOpen ? arrowUpIcon : arrowDownIcon}
                alt="dropdown arrow"
                className="organization-dialog__dropdown-arrow"
              />
            </button>
            {isCompanyTypeDropdownOpen && (
              <div className="organization-dialog__dropdown-menu">
                {companyTypes.map((type) => (
                  <label
                    key={type.indicator}
                    className="organization-dialog__dropdown-checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={formData.type.includes(type.indicator)}
                      onChange={() => handleCompanyTypeToggle(type.indicator)}
                    />
                    {type.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDialog; 