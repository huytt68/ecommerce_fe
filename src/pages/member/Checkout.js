import React, { useEffect, useState } from 'react';
import payment from 'assets/payment.svg';
import { useSelector } from 'react-redux';
import { formatMoney } from 'ultils/helpers';
import { Button, Congrat, Paypal } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import { getCurrent } from 'store/user/asyncActions';
import {
	Card,
	Checkbox,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { apiCreateOrder } from 'apis';

const Checkout = ({ dispatch, navigate }) => {
	const { currentCart, current } = useSelector((state) => state.user);
	const [isSuccess, setIsSuccess] = useState(false);
	const totalAmount = currentCart?.reduce(
		(sum, el) => +el?.price * +el?.quantity + sum,
		0
	);
	console.log(currentCart);
	const handleSaveOrder = async () => {
		const response = await apiCreateOrder({
			products: currentCart,
			total: totalAmount,
			address: current?.address,
			status: 'Succeed',
		});
		console.log(response);
		if (response.success) {
			// setIsSuccess(true)
			setTimeout(() => {
				Swal.fire(
					'Chúc mừng!',
					'Đơn hàng đã được thanh toán thành công',
					'success'
				).then(() => {
					// window.close()
					navigate('/');
				});
			}, 1000);
		}
	};

	useEffect(() => {
		if (isSuccess) dispatch(getCurrent());
		// navigate('/')
	}, [isSuccess]);

	return (
		<div className="w-full p-8 grid h-full max-h-screen overflow-y-auto grid-cols-10 gap-6">
			{isSuccess && <Congrat />}

			<div className="w-full flex justify-center  items-center col-span-4">
				<img src={payment} alt="payment" className="h-[70%] object-contain" />
			</div>
			<div className="w-full flex flex-col justify-center col-span-6 gap-6">
				<h2 className="text-3xl mb-6 font-bold">Thanh toán đơn hàng</h2>
				<div className="flex w-full gap-6 ">
					<div className="flex-1">
						<table className="table-auto h-fit">
							<thead>
								<tr className="border bg-gray-300 p-2">
									<th className="p-2">Sản phẩm</th>
									<th className="text-center p-2">Số lượng</th>
									<th className="text-center p-2">Giá tiền</th>
								</tr>
							</thead>
							<tbody>
								{currentCart?.map((el) => (
									<tr className="border" key={el._id}>
										<td className="text-center p-2">{el.product?.title}</td>
										<td className="text-center p-2">{el.quantity}</td>
										<td className="text-center p-2">
											{formatMoney(el.price) + ' VNĐ'}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex-1 flex flex-col justify-between gap-[45px]">
						<div className="flex flex-col gap-6">
							<span className="flex items-center gap-8 text-sm">
								<span className="font-medium">Tổng tiền:</span>
								<span className="text-main font-bold">
									{`${formatMoney(
										currentCart?.reduce(
											(sum, el) => +el?.price * +el?.quantity + sum,
											0
										)
									)} VNĐ`}{' '}
								</span>
							</span>
							<span className="flex items-center gap-8 text-sm">
								<span className="font-medium">Địa chỉ:</span>
								<span className="text-main font-bold">{current?.address} </span>
							</span>
						</div>
					</div>
				</div>
				<div className="w-full">
					<Checkbox
						className="flex flex-row"
						label="Thanh toán khi nhận hàng COD"
						defaultChecked
					/>
					{/* <Checkbox
						className="flex flex-row"
						label="Thanh toán online"
						disabled={true}
					/> */}
				</div>
				<div>
					<Button handleOnClick={handleSaveOrder}>Thanh toán</Button>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(Checkout);
