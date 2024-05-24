import icons from './icons';

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
	string
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split(' ')
		.join('-');

export const formatMoney = (number) =>
	Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
	if (!Number(number)) return;
	// 4 => [1,1,1,1,0]
	// 2 => [1,1,0,0,0]
	const stars = [];
	number = Math.round(number);
	for (let i = 0; i < +number; i++)
		stars.push(<AiFillStar color="orange" size={size || 16} />);
	for (let i = 5; i > +number; i--)
		stars.push(<AiOutlineStar color="orange" size={size || 16} />);

	return stars;
};

export const validate = (payload, setInvalidFields) => {
	let invalids = 0;
	const formatPayload = Object.entries(payload);
	for (let arr of formatPayload) {
		if (arr[1].trim() === '') {
			invalids++;
			setInvalidFields((prev) => [
				...prev,
				{ name: arr[0], mes: 'Require this field.' },
			]);
		}
	}
	for (let arr of formatPayload) {
		switch (arr[0]) {
			case 'email':
				const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!arr[1].match(regex)) {
					invalids++;
					setInvalidFields((prev) => [
						...prev,
						{ name: arr[0], mes: 'Email không hợp lệ' },
					]);
				}
				break;

			case 'password':
				if (arr[1].length < 6) {
					invalids++;
					setInvalidFields((prev) => [
						...prev,
						{ name: arr[0], mes: 'Mật khẩu tối thiểu 6 kí tự.' },
					]);
				}
				break;

			default:
				break;
		}
	}

	return invalids;
};

export const generateRange = (start, end) => {
	const length = end + 1 - start;
	return Array.from({ length }, (_, index) => start + index);
};

export function getBase64(file) {
	if (!file) return '';
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
