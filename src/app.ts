import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import { corsAllowedOrigins } from './config/env_variables';
import routes from './routes';

process.on('uncaughtException', (e) => {
	console.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 50000 }));
app.use(
	cors({
		origin: (origin, callback) => {
			if (corsAllowedOrigins?.split(',').includes('*')) {
				callback(null, '*');
			} else {
				callback(null, corsAllowedOrigins?.split(','));
			}
		},
		optionsSuccessStatus: 200,
	}),
);

// Routes
app.use('', routes);

app.get('*', (req: Request, res: Response) => {
	return res.status(404).json({
		message:
			'The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.',
	});
});

export default app;
