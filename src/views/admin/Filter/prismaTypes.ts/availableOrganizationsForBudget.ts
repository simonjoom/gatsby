/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: availableOrganizationsForBudget
// ====================================================

export interface availableOrganizationsForBudget_organizations_country {
  id: string;
  name: string;
}

export interface availableOrganizationsForBudget_organizations_category {
  id: string;
  name: string;
}

export interface availableOrganizationsForBudget_organizations_owner {
  id: string;
}

export interface availableOrganizationsForBudget_organizations_persons {
  id: string;
}

export interface availableOrganizationsForBudget_organizations {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: availableOrganizationsForBudget_organizations_country[] | null;
  category: availableOrganizationsForBudget_organizations_category[] | null;
  owner: availableOrganizationsForBudget_organizations_owner | null;
  persons: availableOrganizationsForBudget_organizations_persons[] | null;
}

export interface availableOrganizationsForBudget {
  organizations: (availableOrganizationsForBudget_organizations | null)[];
}

export interface availableOrganizationsForBudgetVariables {
  budget?: number | null;
}
