/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pictures
// ====================================================

export interface pictures_bigpictures_upload {
  path: string;
  filename: string;
}

export interface pictures_bigpictures {
  id: string | null;
  file: string;
  upload: pictures_bigpictures_upload[] | null;
}

export interface pictures {
  bigpictures: (pictures_bigpictures | null)[] | null;
}
