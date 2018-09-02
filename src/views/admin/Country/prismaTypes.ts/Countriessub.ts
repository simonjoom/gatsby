/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: Countriessub
// ====================================================

export interface Countriessub_country_node {
  id: string;
  name: string;
}

export interface Countriessub_country_previousValues {
  id: string;
  name: string;
}

export interface Countriessub_country {
  mutation: MutationType;
  node: Countriessub_country_node | null;
  updatedFields: string[] | null;
  previousValues: Countriessub_country_previousValues | null;
}

export interface Countriessub {
  country: Countriessub_country | null;
}

export interface CountriessubVariables {
  mutation?: MutationType[] | null;
}
