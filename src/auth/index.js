import axios from 'axios';

export function login(userDetails) {
  return axios
    .post('/api/v1/users/login', userDetails);
}

export function register(userDetails) {
  return axios
    .post('/api/v1/users/register', userDetails);
}
