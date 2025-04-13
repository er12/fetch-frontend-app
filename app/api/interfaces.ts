export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}
export interface User {
    id?: string;
    name?: string;
    email?: string;
}
export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}
export interface Coordinates {
    lat: number;
    lon: number;
}

export type SortString = `${"breed" | "name" | "age"}:${"asc" | "desc"}`;

export interface SearchParams {
    from?: number;
    size?: number;
    sort?: SortString;
}