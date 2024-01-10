import { useEffect, useState } from 'react';
import axiosInstance from '../services/api-client';

const GetAllLaptops = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get('/products/laptop');
				setData(response.data.data.data);

				console.log(response.data.data.data);
			} catch (error) {
				console.error('Axios error:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<ul className="list-group">
				{data?.map((item) => (
					<li key={item.id} className="list-group-item">
						{item.name}
					</li>
				))}
			</ul>
		</>
	);
};

export default GetAllLaptops;
