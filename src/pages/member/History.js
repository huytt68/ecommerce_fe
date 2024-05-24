import { apiGetProduct, apiGetUserOrders } from 'apis';
import { CustomSelect, InputForm, Pagination } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { statusOrders } from 'ultils/contants';

const History = ({ navigate, location }) => {
	const [orders, setOrders] = useState(null);
	const [counts, setCounts] = useState(0);
	const [params] = useSearchParams();
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useForm();
	const q = watch('q');
	const status = watch('status');
	const fetchOrders = async (params) => {
		const response = await apiGetUserOrders({
			...params,
			limit: process.env.REACT_APP_LIMIT,
		});
		console.log(response);
		if (response.success) {
			setCounts(response.counts);
			setOrders(response.orders);
		}
	};
	useEffect(() => {
		const pr = Object.fromEntries([...params]);
		fetchOrders(pr);
	}, [params]);

	const handleSearchStatus = ({ value }) => {
		navigate({
			pathname: location.pathname,
			search: createSearchParams({ status: value }).toString(),
		});
	};

	return (
		<div className="w-full relative px-4">
			<header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
				Lịch sử mua hàng
			</header>
			<div className="flex  justify-end items-center px-4">
				<form className="w-[45%] grid-cols-2 gap-4">
					{/* <div className="col-span-1">
						<InputForm
							id="q"
							register={register}
							errors={errors}
							fullWidth
							placeholder="Tìm kiếm đơn hàng bằng trạng thái, ..."
						/>
					</div> */}
					<div className="col-span-1 flex items-center">
						<CustomSelect
							options={statusOrders}
							value={status}
							onChange={(val) => handleSearchStatus(val)}
							wrapClassname="w-full"
						/>
					</div>
				</form>
			</div>
			<table className="table-auto w-full">
				<thead>
					<tr className="border bg-sky-900 text-white border-white ">
						<th className="text-center py-2">#</th>
						<th className="text-center py-2">Sản phẩm</th>
						<th className="text-center py-2">Tổng tiền</th>
						<th className="text-center py-2">Trạng thái</th>
						<th className="text-center py-2">Ngày mua</th>
						<th className="text-center py-2">Action</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((el, idx) => (
						<tr className="border-b" key={el._id}>
							<td className="text-center py-2">
								{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) *
									process.env.REACT_APP_LIMIT +
									idx +
									1}
							</td>

							<td className="text-center py-2 border border-l-2">
								<span className="flex flex-col items-start">
									{el.products?.map((item) => (
										<span className="flex items-center gap-2" key={item._id}>
											{`${item.quantity} x ${item.product} - ${item.size}`}
										</span>
									))}
								</span>
							</td>
							<td className="text-center py-2">{el.total + ' VND'}</td>
							<td className="text-center py-2">{el.status}</td>
							<td className="text-center py-2">
								{moment(el.createdAt)?.format('DD/MM/YYYY')}
							</td>
							{/* <td className='text-center py-2'>
                <span onClick={() => setEditProduct(el)} className='text-orange-500 hover:underline cursor-pointer px-1'>Edit</span>
                <span onClick={() => handleDeleteProduct(el._id)} className='text-orange-500 hover:underline cursor-pointer px-1'>Remove</span>
              </td> */}
						</tr>
					))}
				</tbody>
			</table>
			<div className="w-full flex justify-end my-8">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default withBaseComponent(History);
