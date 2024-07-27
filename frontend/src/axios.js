import Axios from 'axios';

const axios = Axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

export default axios;
