import api from "../axios-instance";
import { User } from "../interfaces";

const AUTH_LOGIN_ENDPOINT = '/auth/login';
const AUTH_LOGOUT_ENDPOINT = '/auth/logout';

// Service to login users
async function logIn(user: User): Promise<boolean> {
    const response = await api.post(AUTH_LOGIN_ENDPOINT, user);
    if (response.status !== 200) {
        throw new Error('Failed to log in user');
    }
    return true;
}


async function logOut(): Promise<boolean> {
    const response = await api.post(AUTH_LOGOUT_ENDPOINT);
    if (response.status !== 200) {
        throw new Error('Failed to log out');
    }
    return true;
}

export const userService = {
    logIn,
    logOut,    
  };