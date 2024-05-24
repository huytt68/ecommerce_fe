import React, { memo } from 'react';
import icons from '../../ultils/icons';

const { MdEmail } = icons;

const Footer = () => {
	return (
		<div className="w-full">
			<div className="h-[103px] w-full bg-main flex items-center justify-center">
				<div className="w-main flex items-center justify-between">
					<div className="flex flex-col flex-1">
						<span className="text-[20px] text-gray-100">
							SIGN UP TO NEWSLETTER
						</span>
						<small className="text-[13px]] text-gray-300">
							Subscribe now and receive weekly newsletter
						</small>
					</div>
					<div className="flex-1 flex items-center">
						<input
							className="p-4 pr-0 rounded-l-full  flex-1 bg-[#f16c6c] outline-none text-gray-100 
                    placeholder:text-sm placeholder:text-gray-100 placeholder:italic placeholder:opacity-50"
							type="text"
							placeholder="Email address"
							name=""
							id=""
						/>

						<div className="h-[56px] w-[56px] bg-[#f16c6c] rounded-r-full flex items-center justify-center text-white">
							<MdEmail size={18} />
						</div>
					</div>
				</div>
			</div>
			<div className="h-[407px] w-full flex bg-gray-900 items-center justify-center text-white text-[13px]">
				<div className="w-main flex">
					<div className="flex-2 flex flex-col gap-2">
						<h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
							VỀ CHÚNG TÔI
						</h3>
						<span className="pr-20">
							<span>
								Chúng tôi được tạo ra với mục đích mang mang lại thật nhiều điều
								tích cực cho cộng đồng những người yêu bóng đá trên toàn đất
								nước Việt Nam. Với chất lượng sản phẩm cùng dịch vụ chăm sóc
								khách hàng kỹ lưỡng, tỉ mỉ, Nghiện Bóng Đá hi vọng sẽ là một địa
								chỉ đáng tin cậy dành cho tất cả các anh em yêu bóng đá. Cùng
								nhau cháy hết mình với môn thể thao Vua, đó chính là những gì
								chúng tôi muốn truyền tải đến các khách hàng. Cảm ơn !
							</span>
						</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
							THÔNG TIN LIÊN HỆ
						</h3>
						<span>
							<span>Điện thoại: </span>
							<span>0985842468</span>
						</span>
						<span>
							<span>Email: </span>
							<span>nghienbongda@gmail.com</span>
						</span>
					</div>

					<div className="flex-1 flex flex-col gap-2">
						<h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
							HỖ TRỢ KHÁCH HÀNG
						</h3>
						<span>Tìm kiếm</span>
						<span>Giới thiệu</span>
						<span>Chính sách đổi trả</span>
						<span>Chính sách bảo mật</span>
						<span>Điều khoản dịch vụ</span>
						<span>Liên hệ</span>
					</div>

					<div className="flex-1 flex flex-col gap-2">
						<h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
							FOLLOW US
						</h3>
						<span>Facebook</span>
						<span>Instagram</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Footer);
