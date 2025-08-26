import axios, { AxiosResponse } from "axios";
import { Organization, Contact, Photo, UpdateOrganizationData, UpdateContactData } from "../types";

const API_BASE_URL = process.env.NODE_ENV === 'development' ? '' : "https://test-task-api.allfuneral.com";

export const getAuthToken = async (username: string): Promise<string> => {
  const response: AxiosResponse = await axios.get(`${API_BASE_URL}/auth`, {
    params: { user: username },
  });
  return response.headers.authorization.split(" ")[1];
};

export const fetchOrganization = async (id: number, token: string): Promise<Organization> => {
  const response: AxiosResponse<Organization> = await axios.get(`${API_BASE_URL}/companies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrganization = async (
  id: number, 
  data: UpdateOrganizationData, 
  token: string
): Promise<Organization> => {
  const response: AxiosResponse<Organization> = await axios.patch(
    `${API_BASE_URL}/companies/${id}`, 
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteOrganization = async (id: number, token: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/companies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadImage = async (id: number, file: File, token: string): Promise<Photo> => {
  const formData = new FormData();
  formData.append("file", file);

  const response: AxiosResponse<Photo> = await axios.post(
    `${API_BASE_URL}/companies/${id}/image`, 
    formData, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteImage = async (id: number, imageName: string, token: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/companies/${id}/image/${imageName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchContact = async (id: number, token: string): Promise<Contact> => {
  const response: AxiosResponse<Contact> = await axios.get(`${API_BASE_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateContact = async (
  id: number, 
  data: UpdateContactData, 
  token: string
): Promise<Contact> => {
  const response: AxiosResponse<Contact> = await axios.patch(
    `${API_BASE_URL}/contacts/${id}`, 
    data, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}; 