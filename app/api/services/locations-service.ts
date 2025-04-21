import api from "../axios-instance";
import { Location, LocationSearchParams, LocationSearchResponse } from "../interfaces";

const LOCATIONS_ENDPOINT = '/locations';
const LOCATIONS_SEARCH_ENDPOINT = '/locations/search';

// use not specified
const fetchLocations = async (body: string[]): Promise<Location[]> => {
    const response = await api.post(LOCATIONS_ENDPOINT, { body });
    return response.data;
};

const searchLocations = async (query: LocationSearchParams): Promise<LocationSearchResponse> => {
    const response = await api.post(LOCATIONS_SEARCH_ENDPOINT, { ...query });
    return response.data;
};

export const locationsService = {
    fetchLocations,
    searchLocations,
};

