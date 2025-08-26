export interface Organization {
  id: number;
  name: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  photos: Photo[];
}

export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}

export interface Photo {
  name: string;
  thumbpath: string;
  path: string;
}

export interface Field {
  label: string;
  value: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: 'edit' | 'delete' | 'organization' | 'contact';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  businessEntity?: string;
  contract?: {
    no: string;
    issue_date: string;
  };
  type?: string[];
}

export interface UpdateContactData {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
} 