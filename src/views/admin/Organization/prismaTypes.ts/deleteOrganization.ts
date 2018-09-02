/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteOrganization
// ====================================================

export interface deleteOrganization_deleteOrganization_country {
  id: string;
  name: string;
}

export interface deleteOrganization_deleteOrganization_category {
  id: string;
  name: string;
}

export interface deleteOrganization_deleteOrganization_owner {
  id: string;
}

export interface deleteOrganization_deleteOrganization_persons {
  id: string;
}

export interface deleteOrganization_deleteOrganization {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: deleteOrganization_deleteOrganization_country[] | null;
  category: deleteOrganization_deleteOrganization_category[] | null;
  owner: deleteOrganization_deleteOrganization_owner | null;
  persons: deleteOrganization_deleteOrganization_persons[] | null;
}

export interface deleteOrganization {
  deleteOrganization: deleteOrganization_deleteOrganization | null;
}

export interface deleteOrganizationVariables {
  name?: string | null;
}
