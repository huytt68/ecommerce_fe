import path from './path';
import icons from './icons';
import { FaT } from 'react-icons/fa6';

export const navigation = [
	{
		id: 1,
		value: 'Trang chủ',
		path: `/${path.HOME}`,
	},
	{
		id: 2,
		value: 'Sản phẩm',
		path: `/${path.PRODUCTS}`,
	},
	{
		id: 3,
		value: 'Dịch vụ',
		path: `/${path.OUR_SERVICES}`,
	},
	{
		id: 4,
		value: 'FAQs',
		path: `/${path.FAQ}`,
	},
];

const { RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift } = icons;

export const productExtraInformation = [
	{
		id: '1',
		title: 'Cam kết',
		sub: 'Chất lượng chính hãng',
		icon: <BsShieldShaded />,
	},
	{
		id: '2',
		title: 'Miễn phí',
		sub: 'Miễn phí giao hàng tất cả',
		icon: <RiTruckFill />,
	},
	{
		id: '3',
		title: 'Quà tặng',
		sub: 'đặc biệt',
		icon: <AiFillGift />,
	},
	{
		id: '4',
		title: 'Đổi trả',
		sub: 'trong 7 ngày',
		icon: <BsReplyFill />,
	},
	{
		id: '5',
		title: 'Tổng đài',
		sub: 'miễn phí 1800 9203',
		icon: <FaTty />,
	},
];

export const productInfoTabs = [
	{
		id: 1,
		name: 'Mô tả',
		content: `- Kiểu dáng: Freesize
        - Chất liệu: 100% cotton
        - Ưu điểm nổi bật: Áo thun cộc tay nữ có chất liệu cotton thoáng mát, độ thấm hút mồ hôi tốt
        - Mix & Match: Dễ dàng mix & match cùng quần jeans, quần short, quần kaki... để tạo nên diện mạo trẻ trung, năng động cho phái đẹp.
        - Người mẫu: Cao 1m65 nặng 45 kg, quần size 26, áo size S
        - Nơi sản xuất: Tự hào sản xuất tại Việt Nam `,
	},
	{
		id: 2,
		name: 'Hướng dẫn bảo quản',
		content: `Nếu giặt và bảo quản không đúng cách thì đồ rất dễ bị phai màu cũ đi.`,
	},
	{
		id: 3,
		name: 'Vận chuyển',
		content: `Mở hộp kiểm tra khi nhận hàng. Đổi hàng không cần lí do.`,
	},
	{
		id: 4,
		name: 'Thanh toán',
		content: `1. Thanh toán trả trước
        - Thanh toán chuyển khoản 100% giá trị đơn hàng gồm: giá trị đơn hàng & chi phí vận chuyển.
        - Sau khi nhận được xác nhận từ bộ phận Sale Online, quý KH vui lòng chuyển khoản hoàn tất đơn hàng trong vòng 24h (không tính thứ bảy, chủ nhật & các ngày lễ tết). Trong trường hợp quá 24h, GENVIET không nhận được thanh toán hoàn tất của quý khách, đơn hàng sẽ không còn hiệu lực.
        2. Thanh toán trả sau (COD)
        - Khi hàng được chuyển giao đến quý khách, xin vui lòng hoàn tất việc thanh toán và ký xác nhận với nhân viên giao hàng trước, sau đó quý khách nhận hàng và kiểm tra sau.
        `,
	},
];

export const sizes = ['XS', 'M', 'L', 'XL', 'XXL'];

export const sorts = [
	// {
	// 	id: 1,
	// 	value: '-sold',
	// 	text: 'Số lượt bán',
	// },
	{
		id: 1,
		value: '-title',
		text: 'A-Z',
	},
	{
		id: 2,
		value: 'title',
		text: 'Z-A',
	},
	{
		id: 3,
		value: '-price',
		text: 'Giá giảm dần',
	},
	{
		id: 4,
		value: 'price',
		text: 'Giá tăng dần',
	},
	{
		id: 5,
		value: '-createdAt',
		text: 'Ngày tạo mới tới cũ',
	},
	{
		id: 6,
		value: 'createdAt',
		text: 'Ngày tạo cũ tới mới',
	},
];

export const voteOptions = [
	{
		id: 1,
		text: 'Rất Tệ',
	},
	{
		id: 2,
		text: 'Tệ',
	},
	{
		id: 3,
		text: 'Khá',
	},
	{
		id: 4,
		text: 'Tốt',
	},
	{
		id: 5,
		text: 'Rất tốt',
	},
];

export const adminSidebar = [
	{
		id: 1,
		type: 'SINGLE',
		text: 'Dashboard',
		path: `/${path.ADMIN}/${path.DASHBOARD}`,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Manage users',
		path: `/${path.ADMIN}/${path.MANAGE_USER}`,
	},
	{
		id: 3,
		type: 'PARENT',
		text: 'Manage products',
		submenu: [
			{
				text: 'Create product',
				path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
			},
			{
				text: 'Manage product',
				path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
			},
		],
	},
	{
		id: 4,
		type: 'SINGLE',
		text: 'Manage orders',
		path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
	},
];

export const memberSidebar = [
	{
		id: 1,
		type: 'SINGLE',
		text: 'Thông tin cá nhân',
		path: `/${path.MEMBER}/${path.PERSONAL}`,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Giỏ hàng',
		path: `/${path.MEMBER}/${path.MY_CART}`,
	},
	{
		id: 3,
		type: 'SINGLE',
		text: 'Lịch sử mua hàng',
		path: `/${path.MEMBER}/${path.HISTORY}`,
	},
	// {
	//     id: 4,
	//     type: 'SINGLE',
	//     text: 'Danh sách yêu thích',
	//     path: `/${path.MEMBER}/${path.WISHLIST}`
	// },
];

export const roles = [
	{
		id: 1,
		value: 'admin',
	},
	{
		id: 2,
		value: 'user',
	},
];
export const blockStatus = [
	{
		code: true,
		value: 'Blocked',
	},
	{
		code: false,
		value: 'Active',
	},
];

export const statusOrders = [
	{
		label: 'Cancelled',
		value: 'Cancelled',
	},
	{
		label: 'Succeed',
		value: 'Succeed',
	},
];
