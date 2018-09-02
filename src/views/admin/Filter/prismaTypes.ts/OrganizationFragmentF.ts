/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFragmentF
// ====================================================

export interface OrganizationFragmentF_country {
  id: string;
  name: string;
}

export interface OrganizationFragmentF_category {
  id: string;
  name: string;
}

export interface OrganizationFragmentF_owner {
  id: string;
}

export interface OrganizationFragmentF_persons {
  id: string;
}

export interface OrganizationFragmentF {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: OrganizationFragmentF_country[] | null;
  category: OrganizationFragmentF_category[] | null;
  owner: OrganizationFragmentF_owner | null;
  persons: OrganizationFragmentF_persons[] | null;
}
