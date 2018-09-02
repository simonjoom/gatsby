/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: picturesub
// ====================================================

export interface picturesub_bigpicture_node_upload {
  path: string;
  filename: string;
}

export interface picturesub_bigpicture_node {
  id: string | null;
  file: string;
  upload: picturesub_bigpicture_node_upload[] | null;
}

export interface picturesub_bigpicture_previousValues {
  id: string;
  file: string;
}

export interface picturesub_bigpicture {
  mutation: MutationType;
  node: picturesub_bigpicture_node | null;
  updatedFields: string[] | null;
  previousValues: picturesub_bigpicture_previousValues | null;
}

export interface picturesub {
  bigpicture: picturesub_bigpicture | null;
}

export interface picturesubVariables {
  mutation?: MutationType[] | null;
}
