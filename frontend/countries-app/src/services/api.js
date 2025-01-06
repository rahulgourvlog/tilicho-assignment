import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const fetchCountries = () => axios.get(`${API_BASE_URL}/countries`);