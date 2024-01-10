import { useEffect, useState } from 'react';
import axiosInstance from '../services/api-client';

const GetAllLaptopsFeatures = () => {
	const [data, setData] = useState(null);

	// Filtering
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get('/products/laptop', {
					// محصولاتی ک دردسترس هستند
					// params: {
					// 	isAvailable: true
					// }

					// محصولات بالاتر یا پایینتر از یک قیمت خاص
					params: {
						// قیمت دقیق
						// price: 559400000
						//
						// قیمت بالاتر
						// price: {
						// 	gte: 559400000
						// }
						//
						// قیمت بالاتر
						// price: {
						// 	lte: 559400000
						// }
					}
				});
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

export default GetAllLaptopsFeatures;
