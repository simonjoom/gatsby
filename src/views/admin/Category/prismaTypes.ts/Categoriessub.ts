/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: Categoriessub
// ====================================================

export interface Categoriessub_category_node {
  id: string;
  name: string;
}

export interface Categoriessub_category_previousValues {
  id: string;
  name: string;
}

export interface Categoriessub_category {
  mutation: MutationType;
  node: Categoriessub_category_node | null;
  updatedFields: string[] | null;
  previousValues: Categoriessub_category_previousValues | null;
}

export interface Categoriessub {
  category: Categoriessub_category | null;
}

export interface CategoriessubVariables {
  mutation?: MutationType[] | null;
}
