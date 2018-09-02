/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CountryUpdateManyInput, CategoryUpdateManyInput, UserUpdateOneWithoutCompanyInput, PersonUpdateManyInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertOrganization
// ====================================================

export interface upsertOrganization_upsertOrganization_country {
  id: string;
  name: string;
}

export interface upsertOrganization_upsertOrganization_category {
  id: string;
  name: string;
}

export interface upsertOrganization_upsertOrganization_owner {
  id: string;
}

export interface upsertOrganization_upsertOrganization_persons {
  id: string;
}

export interface upsertOrganization_upsertOrganization {
  id: string;
  name: string;
  budget: number | null;
  bid: number | null;
  country: upsertOrganization_upsertOrganization_country[] | null;
  category: upsertOrganization_upsertOrganization_category[] | null;
  owner: upsertOrganization_upsertOrganization_owner | null;
  persons: upsertOrganization_upsertOrganization_persons[] | null;
}

export interface upsertOrganization {
  upsertOrganization: upsertOrganization_upsertOrganization;
}

export interface upsertOrganizationVariables {
  namewhere?: string | null;
  name: string;
  budget?: number | null;
  bid?: number | null;
  country?: CountryUpdateManyInput | null;
  category?: CategoryUpdateManyInput | null;
  owner?: UserUpdateOneWithoutCompanyInput | null;
  persons?: PersonUpdateManyInput | null;
}
