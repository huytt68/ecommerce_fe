import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Sidebar = () => {
	const { categories } = useSelector((state) => state.app);
	// console.log(categories);
	return (
		<div className="flex flex-col border">
			<span className="place-self-center py-3 font-bold">DANH MỤC</span>
			{categories?.map((el) => (
				<NavLink
					key={el.title}
					to={el.title}
					className={({ isActive }) =>
						isActive
							? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
							: 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
					}
				>
					{el.title}
				</NavLink>
			))}
		</div>
	);
};

export default memo(Sidebar);
