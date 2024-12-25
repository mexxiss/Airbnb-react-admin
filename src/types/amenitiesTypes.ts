// types.ts or amenitiesTypes.ts

export interface Amenity {
  _id: string;
  title: string;
  icon: string;
  __v: number;
}

export interface AmenitiesResponse {
  msg: string;
  data: Amenity[];
}
