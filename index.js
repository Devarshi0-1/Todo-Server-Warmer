// npm install axios
import axios from 'axios';

const base_url = 'https://mern-todo-backend-vercel.vercel.app/api/v1'; // Replace with your actual base URL

const getEndpoints = ['/task/my', '/users/me'];

const postEndpoints = ['/users/login'];

const warmUpInterval = 1000 * 60 * 15;

const warmServer = () => {
	getEndpoints.forEach((endpoint) => {
		const url = base_url + endpoint;

		axios
			.get(url)
			.then((response) => {
				console.log(`Request to ${url} sent successfully`);
			})
			.catch((error) => {
				console.error(
					`Error sending request to ${url}:`,
					error.response.data.message
				);
			});
	});

	postEndpoints.forEach((endpoint) => {
		const url = base_url + endpoint;

		axios
			.post(url)
			.then((response) => {
				console.log(`Request to ${url} sent successfully`);
			})
			.catch((error) => {
				console.error(
					`Error sending request to ${url}:`,
					error.response.data.message
				);
			});
	});
};

setInterval(warmServer, warmUpInterval);
