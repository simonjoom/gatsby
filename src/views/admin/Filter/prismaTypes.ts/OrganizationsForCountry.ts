/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationsForCountry
// ====================================================

export interface OrganizationsForCountry_organizations_country {
  id: string;
  name: string;
}

export interface OrganizationsForCountry_organizations_category {
  id: string;
  name: string;
}

export interface OrganizationsForCountry_organizations_owner {
  id: string;
}

export interface OrganizationsForCountry_organizations_persons {
  id: string;
}

export interface OrganizationsForCountry_organizations {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: OrganizationsForCountry_organizations_country[] | null;
  category: OrganizationsForCountry_organizations_category[] | null;
  owner: OrganizationsForCountry_organizations_owner | null;
  persons: OrganizationsForCountry_organizations_persons[] | null;
}

export interface OrganizationsForCountry {
  organizations: (OrganizationsForCountry_organizations | null)[];
}

export interface OrganizationsForCountryVariables {
  namecountry: string;
}
