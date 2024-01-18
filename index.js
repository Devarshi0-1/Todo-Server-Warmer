import express from 'express';
import axios from 'axios';
const app = express();

const PORT = 5000;

const warmUpInterval = 1000 * 60 * 5;

const mainBackendUrl = 'https://mern-todo-backend-vercel.vercel.app/api/v1';

const endpointsToWarmGET = ['/task/my', '/users/me'];

const endpointsToWarmPOST = ['/users/login'];

async function keepEndpointWarmGET(endpoint) {
	try {
		await axios.get(`${mainBackendUrl}${endpoint}`);
		console.log(`Warming call successful for ${endpoint}`);
	} catch (error) {
		console.error(`Error warming ${endpoint}: ${error.response.data.message}`);
	}
}

async function keepEndpointWarmPOST(endpoint) {
	try {
		await axios.post(`${mainBackendUrl}${endpoint}`);
		console.log(`Warming call successful for ${endpoint}`);
	} catch (error) {
		console.error(`Error warming ${endpoint}: ${error.response.data.message}`);
	}
}

setInterval(async () => {
	for (const endpoint of endpointsToWarmGET) {
		await keepEndpointWarmGET(endpoint);
	}

	for (const endpoint of endpointsToWarmPOST) {
		await keepEndpointWarmPOST(endpoint);
	}
}, warmUpInterval);

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
});
