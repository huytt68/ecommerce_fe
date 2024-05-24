import SelectQuantity from 'components/common/SelectQuantity';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { useEffect, useState } from 'react';
import { updateCart } from 'store/user/userSlice';
import { formatMoney } from 'ultils/helpers';

const OrderItem = ({
	el,
	defaultQuantity = 1,
	dispatch,
	size,
	price,
	title,
	pid,
}) => {
	const [quantity, setQuantity] = useState(() => defaultQuantity);
	const handleQuantity = (number) => {
		if (+number > 1) setQuantity(number);
	};
	const handleChangeQuantity = (flag) => {
		if (flag === 'minus' && quantity === 1) return;
		if (flag === 'minus') setQuantity((prev) => +prev - 1);
		if (flag === 'plus') setQuantity((prev) => +prev + 1);
	};
	useEffect(() => {
		dispatch(updateCart({ pid: el.product?._id, quantity, size }));
	}, [quantity]);

	return (
		<div className="w-main mx-auto border-b  font-bold my-8 py-3 grid grid-cols-10">
			<span className="col-span-6 w-full text-center">
				<div className="flex gap-2 px-4 py-3">
					<img
						src={el.product?.thumb}
						alt="thumb"
						className="w-20 h-20 object-cover"
					/>
					<div className="flex flex-col  items-start gap-1">
						<span className="text-orange-500">{el.product?.title} </span>
						<span>{el.size}</span>
					</div>
				</div>
			</span>
			<span className="col-span-1 w-full text-center">
				<div className="flex items-center h-full">
					<SelectQuantity
						quantity={quantity}
						handleQuantity={handleQuantity}
						handleChangeQuantity={handleChangeQuantity}
					/>
				</div>
			</span>
			<span className="col-span-3 w-full h-full flex items-center justify-center  text-center">
				<span className="text-lg items-center">
					{formatMoney(el.price * quantity) + 'VNĐ'}
				</span>
			</span>
		</div>
	);
};

export default withBaseComponent(OrderItem);
