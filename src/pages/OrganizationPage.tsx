import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Sidebar from "../components/Sidebar";
import CompanyHeader from "../components/CompanyHeader";
import OrganizationDetails from "../components/OrganizationDetails";
import ContactDetails from "../components/ContactDetails";
import PhotoSection from "../components/PhotoSection";
import Modal from "../components/Modal";

import NameEditDialog from "../dialogs/NameEditDialog";
import CompanyDeleteDialog from "../dialogs/CompanyDeleteDialog";
import OrganizationDialog from "../dialogs/OrganizationDialog";
import ContactDialog from "../dialogs/ContactDialog";

import { organizationStore } from "../stores/OrganizationStore";

const OrganizationPage: React.FC = observer(() => {
  const {
    organization,
    contact,
    loading,
    error,
    nameEditModalOpen,
    deleteModalOpen,
    organizationDialogOpen,
    contactDialogOpen,
    initialize,
    updateOrganizationName,
    deleteOrganization,
    updateOrganization,
    updateContact,
    uploadImage,
    deleteImage,
    openNameEditModal,
    closeNameEditModal,
    openDeleteModal,
    closeDeleteModal,
    openOrganizationDialog,
    closeOrganizationDialog,
    openContactDialog,
    closeContactDialog,
    clearError
  } = organizationStore;

  useEffect(() => {
    initialize();
  }, []);

  const handleEditContact = async (data: {
    person: string;
    phoneNumber: string;
    email: string;
  }) => {
    const name = data.person.split(" ", 1);
    const updateData = {
      lastname: name[0],
      firstname: data.person.substring(data.person.indexOf(" ") + 1),
      phone: data.phoneNumber,
      email: data.email
    };
    await updateContact(updateData);
  };

  const handleUpdateOrg = async (data: {
    businessEntity: string;
    agreementNumber: string;
    agreementDate: string;
    type: string[];
  }) => {
    const updateData = {
      businessEntity: data.businessEntity,
      contract: {
        no: data.agreementNumber,
        issue_date: data.agreementDate,
      },
      type: data.type
    };
    await updateOrganization(updateData);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!organization || !contact) return <div className="loading">No data available</div>;

  return (
    <>
      <Sidebar />
      <main className="app__main">
        <div className="app__content">
          <CompanyHeader 
            name={organization.name} 
            onEdit={openNameEditModal} 
            onDelete={openDeleteModal} 
          />
          
          <Modal isOpen={nameEditModalOpen} onClose={closeNameEditModal}>
            <NameEditDialog 
              name={organization.name} 
              onCancel={closeNameEditModal} 
              onSave={updateOrganizationName}
            />
          </Modal>
          
          <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
            <CompanyDeleteDialog 
              onCancel={closeDeleteModal} 
              onSave={deleteOrganization}
            />
          </Modal>
          
          {organizationDialogOpen ? (
            <OrganizationDialog 
              organization={organization} 
              onSave={handleUpdateOrg} 
              onClose={closeOrganizationDialog} 
            />
          ) : (
            <OrganizationDetails
              onEdit={openOrganizationDialog}
              title="Company Details"
              fields={[
                { 
                  label: "Agreement:", 
                  value: `${organization.contract.no}/${organization.contract.issue_date}` 
                },
                { 
                  label: "Business entity:", 
                  value: organization.businessEntity 
                },
                { 
                  label: "Company type:", 
                  value: organization.type.join(',') 
                }
              ]}
            />
          )}
          
          {contactDialogOpen ? (
            <ContactDialog 
              contact={contact} 
              onSave={handleEditContact} 
              onClose={closeContactDialog} 
            />
          ) : (
            <ContactDetails
              onEdit={openContactDialog}
              title="Contacts"
              fields={[
                { 
                  label: "Responsible person:", 
                  value: `${contact.firstname} ${contact.lastname}` 
                },
                { 
                  label: "Phone number:", 
                  value: contact.phone 
                },
                { 
                  label: "E-mail:", 
                  value: contact.email 
                }
              ]}
            />
          )}
          
          <PhotoSection 
            photos={organization.photos} 
            onUpload={uploadImage} 
            onDelete={deleteImage} 
          />
        </div>
      </main>
    </>
  );
});

export default OrganizationPage; 