import api from "../axios-instance";
import { SearchParams, User } from "../interfaces";

const DOGS_BREEDS_ENDPOINT = '/dogs/breeds';
const DOGS_SEARCH_ENDPOINT = '/dogs/search';
const DOGS_BY_IDS_ENDPOINT = '/dogs';
const DOGS_MATCH_ENDPOINT = '/dogs/match';

export interface DogsSearchParams extends SearchParams {
    breed?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
}

interface Match {
    match: string;
}

export const fetchDogBreeds = async (): Promise<string[]> => {
    const response = await api.get(DOGS_BREEDS_ENDPOINT);
    return response.data;
};

export const searchDogs = async (query: DogsSearchParams) => {
    const response = await api.post(DOGS_SEARCH_ENDPOINT, query);
    return response.data;
};

export const fetchDogsByIds = async (dogIds: string[]) => {
    const response = await api.post(DOGS_BY_IDS_ENDPOINT, { body: { ...dogIds } });
    return response.data;
};

export const matchDogs = async (dogsIds: string[]): Promise<Match> => {
    const response = await api.post(DOGS_MATCH_ENDPOINT, dogsIds);
    return response.data;
};

