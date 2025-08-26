import { makeAutoObservable, runInAction } from 'mobx';
import { Organization, Contact, Photo, UpdateOrganizationData, UpdateContactData } from '../types';
import * as api from '../services/api';

class OrganizationStore {
  organization: Organization | null = null;
  contact: Contact | null = null;
  token: string = '';
  loading: boolean = false;
  error: string | null = null;

  // Modal states
  nameEditModalOpen: boolean = false;
  deleteModalOpen: boolean = false;
  organizationDialogOpen: boolean = false;
  contactDialogOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  initialize = async () => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const authToken = await api.getAuthToken("USERNAME");
      const [contactData, orgData] = await Promise.all([
        api.fetchContact(16, authToken),
        api.fetchOrganization(12, authToken)
      ]);

      runInAction(() => {
        this.token = authToken;
        this.contact = contactData;
        this.organization = orgData;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.loading = false;
      });
    }
  }

  updateOrganizationName = async (name: string) => {
    if (!this.organization) return;
    
    try {
      const updatedOrg = await api.updateOrganization(12, { name }, this.token);
      runInAction(() => {
        this.organization = updatedOrg;
        this.nameEditModalOpen = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to update organization';
      });
    }
  }

  updateOrganization = async (data: UpdateOrganizationData) => {
    if (!this.organization) return;

    try {
      const updateData = {
        businessEntity: data.businessEntity,
        contract: data.contract,
        type: data.type
      };
      const updatedOrg = await api.updateOrganization(12, updateData, this.token);
      runInAction(() => {
        this.organization = updatedOrg;
        this.organizationDialogOpen = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to update organization';
      });
    }
  }

  deleteOrganization = async () => {
    try {
      await api.deleteOrganization(12, this.token);
      runInAction(() => {
        this.organization = null;
        this.deleteModalOpen = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to delete organization';
      });
    }
  }

  updateContact = async (data: UpdateContactData) => {
    if (!this.contact) return;

    try {
      const updatedContact = await api.updateContact(16, data, this.token);
      runInAction(() => {
        this.contact = updatedContact;
        this.contactDialogOpen = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to update contact';
      });
    }
  }

  uploadImage = async (file: File) => {
    if (!this.organization) return;

    try {
      const newImage = await api.uploadImage(12, file, this.token);
      runInAction(() => {
        if (this.organization) {
          this.organization.photos = [...this.organization.photos, newImage];
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to upload image';
      });
    }
  }

  deleteImage = async (imageName: string) => {
    if (!this.organization) return;

    try {
      await api.deleteImage(12, imageName, this.token);
      runInAction(() => {
        if (this.organization) {
          this.organization.photos = this.organization.photos.filter(
            (img) => img.name !== imageName
          );
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to delete image';
      });
    }
  }

  // Modal actions
  openNameEditModal = () => {
    this.nameEditModalOpen = true;
  };

  closeNameEditModal = () => {
    this.nameEditModalOpen = false;
  };

  openDeleteModal = () => {
    this.deleteModalOpen = true;
  };

  closeDeleteModal = () => {
    this.deleteModalOpen = false;
  };

  openOrganizationDialog = () => {
    this.organizationDialogOpen = true;
  };

  closeOrganizationDialog = () => {
    this.organizationDialogOpen = false;
  };

  openContactDialog = () => {
    this.contactDialogOpen = true;
  };

  closeContactDialog = () => {
    this.contactDialogOpen = false;
  };

  clearError = () => {
    this.error = null;
  };
}

export const organizationStore = new OrganizationStore(); 