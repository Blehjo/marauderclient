
import axios from "axios";
import { User } from "../../store/user/user.types";

const api = "http://localhost:8000/api/users";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded ' 
}

export const userDocument = (user: User) => user;

export const login = async (username: string, password: string): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/authenticate`,
        data: {
            username,
            password
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export const getUser = async (): Promise<User> => {
    const user = await axios({
        method: 'get',
        url: `${api}/data`,
        headers: headers,
        withCredentials: true
    });
    const result = await user.data;
    return result;
}

export const signUpUser = async (
    formData: FormData
) => {
    const response = await axios({
        method: 'post',
        url: `${api}/register`,
        data: formData,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export const signOutUser = async (): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/logout`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}