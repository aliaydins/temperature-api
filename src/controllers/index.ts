import asyncHandler from '../helpers/asyncHandler';
import { getTemperature } from '../services/temperature';

export const user = asyncHandler(async (req, res) => {
	const data = { firstname: 'Ali', lastname: 'AYDIN' };

	return res.status(200).json(data);
});

export const temperature = asyncHandler(async (req, res) => {
	const { temperature, message, status_code } = await getTemperature(req.query['city'] as string);

	if (message) {
		return res.status(status_code).json({ message });
	}

	return res.status(status_code).json({ temperature });
});
