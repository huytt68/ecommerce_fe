import React, { Fragment, memo, useState } from 'react';
import logo from 'assets/logo1.webp';
import icons from 'ultils/icons';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';
import { showCart } from 'store/app/appSlice';

const { RiPhoneFill, MdEmail, BsFillHandbagFill, FaCircleUser } = icons;
const Header = ({ dispatch }) => {
	const { current } = useSelector((state) => state.user);
	const [isShowOption, setIsShowOption] = useState(false);

	return (
		<div className="w-main flex justify-between h-[110px] py-[35px]">
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="h-[60px] object-contain" />
			</Link>

			<div className="flex text-[13px] ">
				<div className="flex flex-col px-6 border-r items-center">
					<span className="flex gap-4 items-center">
						<RiPhoneFill color="red" />
						<span className="font-semibold">0985842468</span>
					</span>
					<span>Hotline 24/7</span>
				</div>

				<div className="flex flex-col items-center px-6 border-r">
					<span className="flex gap-4 items-center">
						<MdEmail color="red" />
						<span className="font-semibold">NGHIENBONGDA98@GMAIL.COM</span>
					</span>
					<span>Support 24/7</span>
				</div>

				{current && (
					<Fragment>
						<div
							onClick={() => dispatch(showCart())}
							className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
						>
							<BsFillHandbagFill color="red" />
							<span>{`${current?.cart?.length || 0}item(s)`} </span>
						</div>

						<div
							className="flex cursor-pointer items-center justify-center px-6 gap-2 relative"
							onClick={() => setIsShowOption((prev) => !prev)}
						>
							<FaCircleUser color="red" />
							<span>Profile</span>
							{isShowOption && (
								<div className="absolute top-full flex flex-col  bg-gray-200 border left-[16px] min-w-[120px] py-2">
									<Link
										className="p-2 w-full hover:bg-sky-200"
										to={`/${path.MEMBER}/${path.PERSONAL}`}
									>
										Personal
									</Link>
									{current?.role === 'admin' && (
										<Link
											className="p-2 w-full hover:bg-sky-200"
											to={`/${path.ADMIN}/${path.DASHBOARD}`}
										>
											Admin
										</Link>
									)}
									<span
										onClick={() => dispatch(logout())}
										className="p-2 w-full hover:bg-sky-200"
									>
										Logout
									</span>
								</div>
							)}
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Header));
