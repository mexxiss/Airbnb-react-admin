export interface GalleryItem {
  _id?: string;
  img_url: string;
  type: string;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: GalleryItem;
}

interface GalleryType {
  _id: string;
  name: string;
}

export interface GalleryTypesResponse {
  statusCode: number;
  data: GalleryType[];
  message: string;
  success: boolean;
}
