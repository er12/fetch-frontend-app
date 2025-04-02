import api from "../axios-instance";
import { Coordinates, Location, SearchParams } from "../interfaces";

const LOCATIONS_ENDPOINT = '/locations';
const LOCATIONS_SEARCH_ENDPOINT = '/locations/search';

export interface LocationSearchParams extends SearchParams {
    city?: string;
    states?: string[];
    geoBoundingBox?: GeoBoundingBox;
}

export interface GeoBoundingBox {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;

    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
}
export interface LocationSearchResponse {
    results: Location[];
    total: number;
}

export const fetchLocations = async (body: string[]): Promise<Location[]> => {
    const response = await api.post(LOCATIONS_ENDPOINT, { body });
    return response.data;
};

export const searchLocations = async (query: LocationSearchParams): Promise<LocationSearchResponse> => {
    const response = await api.get(LOCATIONS_SEARCH_ENDPOINT, { params: query });
    return response.data;
};
