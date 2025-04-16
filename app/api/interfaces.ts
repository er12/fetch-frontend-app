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

export type SortString = `${"breed" | "name" | "age"}:${"asc" | "desc"}`;

export interface SearchParams {
    from?: number;
    size?: number;
    sort?: SortString;
}

//Location Types

export interface Location {
    id?: number;
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

//Mutually exclusive types for bounding box
type BoundingBoxByEdges = {
    top: number;
    left: number;
    bottom: number;
    right: number;
    bottom_left?: never;
    top_right?: never;
    bottom_right?: never;
    top_left?: never;
};

type BoundingBoxByBottomLeftTopRight = {
    bottom_left: Coordinates;
    top_right: Coordinates;
    top?: never;
    left?: never;
    bottom?: never;
    right?: never;
    bottom_right?: never;
    top_left?: never;
};

type BoundingBoxByBottomRightTopLeft = {
    bottom_right: Coordinates;
    top_left: Coordinates;
    top?: never;
    left?: never;
    bottom?: never;
    right?: never;
    bottom_left?: never;
    top_right?: never;
};

type BoundingBoxFullCorners = {
    bottom_left: Coordinates;
    top_right: Coordinates;
    bottom_right: Coordinates;
    top_left: Coordinates;
    top?: never;
    left?: never;
    bottom?: never;
    right?: never;
};

export type GeoBoundingBox =
    | BoundingBoxByEdges
    | BoundingBoxByBottomLeftTopRight
    | BoundingBoxByBottomRightTopLeft
    | BoundingBoxFullCorners;


export interface LocationSearchParams extends Omit<SearchParams, 'sort'> {
    city?: string;
    states?: string[];
    geoBoundingBox?: GeoBoundingBox;
}


export interface LocationSearchResponse {
    results: Location[];
    total: number;
}