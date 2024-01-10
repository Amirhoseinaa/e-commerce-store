import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:3000/api/v1'
});

// class APIClient<T> {
// 	endPoint: string;
// 	constructor(endpoint: string) {
// 		this.endPoint = endpoint;
// 	}

// 	getAll = (config?: AxiosRequestConfig) =>
// 		axiosInstance.get < FetchResponse < T >> (this.endPoint, config).then((res) => res.data);

// 	get = (id: string | number) =>
// 		axiosInstance.get < T > (this.endPoint + '/' + id).then((res) => res.data);
// }

export default axiosInstance;
