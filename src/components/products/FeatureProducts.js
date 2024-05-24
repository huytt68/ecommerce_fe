import React, { useState, useEffect, memo } from 'react';
import { ProductCard } from '..';
import { apiGetProducts } from '../../apis';

const FeatureProducts = () => {
	const [products, setProducts] = useState(null);

	const fetchProducts = async () => {
		const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
		if (response.success) setProducts(response.products);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className="w-full">
			<h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
				FEATURED PRODUCTS
			</h3>
			<div className="flex flex-wrap mt-[15px] mx-[-10px]">
				{products?.map((el) => (
					<ProductCard
						key={el._id}
						image={el.thumb}
						title={el.title}
						totalRatings={el.totalRatings}
						price={el.price}
					/>
				))}
			</div>
			{/* <div className='flex'>
            <img
                src="https://file.hstatic.net/1000304105/file/g-jean-home-1200-gioithieu_c71ef30583eb4707b385506ffed11ffa.jpg"
                alt=""
            />
        </div> */}
		</div>
	);
};

export default memo(FeatureProducts);
