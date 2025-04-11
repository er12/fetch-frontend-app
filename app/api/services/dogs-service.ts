import api from "../axios-instance";
import { SearchParams } from "../interfaces";

const DOGS_BREEDS_ENDPOINT = '/dogs/breeds';
const DOGS_SEARCH_ENDPOINT = '/dogs/search';
const DOGS_BY_IDS_ENDPOINT = '/dogs';
const DOGS_MATCH_ENDPOINT = '/dogs/match';

export interface DogsSearchParams extends SearchParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
}

export interface Match {
    match: string;
}

export interface DogsSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

const fetchDogBreeds = async (): Promise<string[]> => {
    const response = await api.get(DOGS_BREEDS_ENDPOINT);
    return response.data;
};

const searchDogsIDs = async (query: DogsSearchParams): Promise<DogsSearchResponse> => {
    const response = await api.get(DOGS_SEARCH_ENDPOINT, { params: query });
    return response.data;
};

const getDogsByIds = async (dogIds: string[]) => {
    const response = await api.post(DOGS_BY_IDS_ENDPOINT, dogIds);
    return response.data;
};

const matchDogs = async (dogsIds: string[]): Promise<Match> => {
    const response = await api.post(DOGS_MATCH_ENDPOINT, dogsIds);
    return response.data;
};


export const dogsService = {
    fetchDogBreeds,
    searchDogsIDs,
    getDogsByIds,
    matchDogs,
};

