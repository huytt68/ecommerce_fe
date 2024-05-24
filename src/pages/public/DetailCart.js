import { Breadcrumb, Button, OrderItem } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, createSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formatMoney } from 'ultils/helpers';
import path from 'ultils/path';

const DetailCart = ({ location, navigate }) => {
	const { currentCart, current } = useSelector((state) => state.user);
	const handleSubmit = () => {
		if (!current?.address)
			return Swal.fire({
				icon: 'info',
				title: 'Almost!',
				text: 'Please update your address before checkout.',
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Go update',
				cancelButtonText: 'Cancel',
			}).then((result) => {
				if (result.isConfirmed)
					navigate({
						pathname: `/${path.MEMBER}/${path.PERSONAL}`,
						search: createSearchParams({
							redirect: location.pathname,
						}).toString(),
					});
			});
		else {
			navigate(`/${path.CHECKOUT}`);
			// window.open(`/${path.CHECKOUT}`, '_blank')
		}
	};
	return (
		<div className="w-full relative px-4">
			<header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
				Giỏ hàng
			</header>
			<div className="flex flex-col border w-main mx-auto my-8">
				<div className="w-full mx-auto bg-gray-600 opacity-70 text-white  font-bold py-3 grid grid-cols-10">
					<span className="col-span-6 w-full text-center">Sản phẩm</span>
					<span className="col-span-1 w-full text-center">Số lượng</span>
					<span className="col-span-3 w-full text-center">Giá</span>
				</div>
				{currentCart?.map((el) => (
					<OrderItem
						key={el._id}
						el={el}
						defaultQuantity={el.quantity}
						title={el.title}
						price={el.price}
					/>
				))}
			</div>

			<div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
				<span className="flex items-center gap-8 text-sm">
					<span>Subtotal:</span>
					<span className="text-main font-bold">
						{`${formatMoney(
							currentCart?.reduce(
								(sum, el) => +el?.price * +el?.quantity + sum,
								0
							)
						)} VNĐ`}{' '}
					</span>
				</span>
				<span className="text-xs italic">
					Shipping, taxes, and discounts calculated at checkout
				</span>
				<Button handleOnClick={handleSubmit}>Thanh toán</Button>
				{/* <Link target='_blank' className='bg-main text-white px-4 py-2 rounded-md' to={`/${path.CHECKOUT}`}>Thanh Toán</Link> */}
			</div>
		</div>
	);
};

export default withBaseComponent(DetailCart);
