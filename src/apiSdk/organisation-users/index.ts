import axios from 'axios';
import queryString from 'query-string';
import { OrganisationUserInterface } from 'interfaces/organisation-user';
import { GetQueryInterface } from '../../interfaces';

export const getOrganisationUsers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organisation-users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrganisationUser = async (organisationUser: OrganisationUserInterface) => {
  const response = await axios.post('/api/organisation-users', organisationUser);
  return response.data;
};

export const updateOrganisationUserById = async (id: string, organisationUser: OrganisationUserInterface) => {
  const response = await axios.put(`/api/organisation-users/${id}`, organisationUser);
  return response.data;
};

export const getOrganisationUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organisation-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOrganisationUserById = async (id: string) => {
  const response = await axios.delete(`/api/organisation-users/${id}`);
  return response.data;
};
