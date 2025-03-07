import React, { useState, useCallback, useEffect } from 'react';
import { InputField, Button, Loading } from 'components';
import {
	apiRegister,
	apiLogin,
	apiForgotPassword,
	apiFinalRegister,
} from 'apis/user';
import Swal from 'sweetalert2';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import path from 'ultils/path';
import { login } from 'store/user/userSlice';
// import { showModal } from 'store/app/appSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from 'ultils/helpers';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [payload, setPayload] = useState({
		email: '',
		password: '',
		firstname: '',
		lastname: '',
		mobile: '',
	});
	const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
	const [invalidFields, setInvalidFields] = useState([]);
	const [isRegister, setIsRegister] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [searchParams] = useSearchParams();
	console.log(searchParams.get('redirect'));
	const resetPayload = () => {
		setPayload({
			email: '',
			password: '',
			firstname: '',
			lastname: '',
			mobile: '',
		});
	};

	const [token, setToken] = useState('');
	const [email, setEmail] = useState('');
	const handleForgotPassword = async () => {
		const response = await apiForgotPassword({ email });
		if (response.success) {
			toast.success(response.mes, { theme: 'colored' });
		} else toast.info(response.mes, { theme: 'colored' });
	};

	useEffect(() => {
		resetPayload();
	}, [isRegister]);

	// submit
	const handleSubmit = useCallback(async () => {
		const { firstname, lastname, mobile, ...data } = payload;

		const invalids = isRegister
			? validate(payload, setInvalidFields)
			: validate(data, setInvalidFields);
		if (invalids === 0) {
			if (isRegister) {
				// dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiRegister(payload);
				// dispatch(showModal({ isShowModal: false, modalChildren: null }));
				// if (response.success) {
				// 	setIsVerifiedEmail(true);
				// } else Swal.fire('Oops!', response.mes, 'error');
				if (response.success) {
					Swal.fire('Congratulation', response.mes, 'success').then(() => {
						setIsRegister(false);
						resetPayload();
					});
				} else Swal.fire('Oops!', response.mes, 'error');
			} else {
				const rs = await apiLogin(data);
				if (rs.success) {
					dispatch(
						login({
							isLoggedIn: true,
							token: rs.accessToken,
							userData: rs.userData,
						})
					);
					navigate(`/${path.HOME}`);
				} else Swal.fire('Oops!', rs.mes, 'error');
			}
		}
	}, [payload, isRegister]);

	const finalRegister = async () => {
		const response = await apiFinalRegister(token);
		if (response.success) {
			Swal.fire('Congratulation', response.mes, 'success').then(() => {
				setIsRegister(false);
				resetPayload();
			});
		} else Swal.fire('Oops!', response.mes, 'error');
		setIsVerifiedEmail(false);
		setToken('');
	};

	return (
		<div className="w-screen h-screen relative">
			{isVerifiedEmail && (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center">
					<div className="bg-white w-[500px] rounded-md p-8">
						<h4 className="">
							Chúng tôi đã gửi mã code đến email của bạn.
							<br /> Vui lòng check mail của bạn.
						</h4>
						<input
							type="text"
							value={token}
							onChange={(e) => setToken(e.target.value)}
							className="p-2 border rounded-md outline-none"
						/>
						<button
							type="button"
							className="px-4 py-2 bg-blue-500 text font-semibold text-white rounded-md ml-4"
							onClick={finalRegister}
						>
							Submit
						</button>
					</div>
				</div>
			)}

			{/* Quên mật khẩu */}
			{isForgotPassword && (
				<div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
					<div className="flex flex-col gap-4">
						<label htmlFor="email">Hãy nhập email :</label>
						<input
							type="text"
							id="email"
							className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
							placeholder="Exp: email@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="flex items-center justify-end  w-full gap-4">
							<Button
								handleOnClick={handleForgotPassword}
								className="px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
								style="px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
							>
								Gửi
							</Button>
							<Button handleOnClick={() => setIsForgotPassword(false)}>
								Quay lại
							</Button>
						</div>
					</div>
				</div>
			)}
			<img
				src="https://img.freepik.com/free-photo/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept_58466-14529.jpg"
				alt=""
				className="w-full h-full object-cover"
			/>
			<div className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center flex">
				<div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
					<h1 className="text-[28px] font-semibold text-main mb-8">
						{isRegister ? 'Đăng kí' : 'Đăng nhập'}
					</h1>

					{/* Đăng ký */}
					{isRegister && (
						<div className="flex flex-col items-center">
							<InputField
								value={payload.firstname}
								setValue={setPayload}
								nameKey="firstname"
								invalidFields={invalidFields}
								setInvalidFields={setInvalidFields}
							/>
							<InputField
								value={payload.lastname}
								setValue={setPayload}
								nameKey="lastname"
								invalidFields={invalidFields}
								setInvalidFields={setInvalidFields}
							/>
						</div>
					)}
					<InputField
						value={payload.email}
						setValue={setPayload}
						nameKey="email"
						invalidFields={invalidFields}
						setInvalidFields={setInvalidFields}
					/>
					{isRegister && (
						<InputField
							value={payload.mobile}
							setValue={setPayload}
							nameKey="mobile"
							invalidFields={invalidFields}
							setInvalidFields={setInvalidFields}
						/>
					)}

					<InputField
						value={payload.password}
						setValue={setPayload}
						nameKey="password"
						type="password"
						invalidFields={invalidFields}
						setInvalidFields={setInvalidFields}
					/>
					<Button
						handleOnClick={handleSubmit}
						className="hover:bg-sky-700"
						type="submit"
						fw
					>
						{isRegister ? 'Đăng kí' : 'Đăng nhập'}
					</Button>
					<div className="flex items-center justify-between my-2 w-full text-sm">
						{!isRegister && (
							<span
								onClick={() => setIsForgotPassword(true)}
								className="text-blue-500 hover:underline hover:cursor-pointer"
							>
								Quên mật khẩu?
							</span>
						)}
						{!isRegister && (
							<span
								className="text-blue-500 hover:underline hover:cursor-pointer"
								onClick={() => setIsRegister(true)}
							>
								Tạo tài khoản
							</span>
						)}
						{isRegister && (
							<span
								className="text-blue-500 hover:underline hover:cursor-pointer w-full text-center"
								onClick={() => setIsRegister(false)}
							>
								Đăng nhập
							</span>
						)}
					</div>
					<Link
						className="text-blue-500 text-sm hover:underline hover:cursor-pointer"
						to={`/${path.HOME}`}
					>
						Go home?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
