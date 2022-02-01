import { ResponseCustom } from '../types/request-types';
import { apiKey, baseUrl } from '../config/env_variables';
import axios from 'axios';

export const getTemperature = async (city?: string): Promise<ResponseCustom> => {
	let r: any;

	try {
		r = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
	} catch (err) {
		return Promise.resolve({ message: 'city not found', status_code: 404 });
	}
	return Promise.resolve({ temperature: r.data.main.temp, status_code: r.status });
};
