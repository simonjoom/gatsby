/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFragment
// ====================================================

export interface OrganizationFragment_country {
  id: string;
  name: string;
}

export interface OrganizationFragment_category {
  id: string;
  name: string;
}

export interface OrganizationFragment_owner {
  id: string;
}

export interface OrganizationFragment_persons {
  id: string;
}

export interface OrganizationFragment {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: OrganizationFragment_country[] | null;
  category: OrganizationFragment_category[] | null;
  owner: OrganizationFragment_owner | null;
  persons: OrganizationFragment_persons[] | null;
}
