import { useEffect, useState } from 'react';
import axiosInstance from '../services/api-client';

const MyComponent = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get('/products/laptop', {
					// مرتب سازی بر اساس قیمت نزولی
					params: {
						sort: '-price'
					}
					//
					// مرتب سازی بر اساس قیمت صعودی
					// params: {
					// 	sort: 'price'
					// }
					//
					// مرتب سازی ترکیبی بر اساس قیمت و امتیاز
					// params: {
					// 	sort: '-ratingsAverage,price'
					// }
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
						{item.price} {item.name}
					</li>
				))}
			</ul>
		</>
	);
};

export default MyComponent;
