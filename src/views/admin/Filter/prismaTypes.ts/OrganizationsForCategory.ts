/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationsForCategory
// ====================================================

export interface OrganizationsForCategory_organizations_country {
  id: string;
  name: string;
}

export interface OrganizationsForCategory_organizations_category {
  id: string;
  name: string;
}

export interface OrganizationsForCategory_organizations_owner {
  id: string;
}

export interface OrganizationsForCategory_organizations_persons {
  id: string;
}

export interface OrganizationsForCategory_organizations {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: OrganizationsForCategory_organizations_country[] | null;
  category: OrganizationsForCategory_organizations_category[] | null;
  owner: OrganizationsForCategory_organizations_owner | null;
  persons: OrganizationsForCategory_organizations_persons[] | null;
}

export interface OrganizationsForCategory {
  organizations: (OrganizationsForCategory_organizations | null)[];
}

export interface OrganizationsForCategoryVariables {
  namecategory: string;
}
