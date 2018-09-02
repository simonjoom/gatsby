/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: availableOrganizationsForBid
// ====================================================

export interface availableOrganizationsForBid_organizations_country {
  id: string;
  name: string;
}

export interface availableOrganizationsForBid_organizations_category {
  id: string;
  name: string;
}

export interface availableOrganizationsForBid_organizations_owner {
  id: string;
}

export interface availableOrganizationsForBid_organizations_persons {
  id: string;
}

export interface availableOrganizationsForBid_organizations {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: availableOrganizationsForBid_organizations_country[] | null;
  category: availableOrganizationsForBid_organizations_category[] | null;
  owner: availableOrganizationsForBid_organizations_owner | null;
  persons: availableOrganizationsForBid_organizations_persons[] | null;
}

export interface availableOrganizationsForBid {
  organizations: (availableOrganizationsForBid_organizations | null)[];
}

export interface availableOrganizationsForBidVariables {
  bid?: number | null;
}
