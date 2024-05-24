import React, { memo, Fragment, useState } from 'react';
import logo from 'assets/logo1.webp';
import { adminSidebar } from 'ultils/contants';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AiOutlineCaretDown } from 'react-icons/ai';

const activedStyle =
	'px-4 py-2 flex items-center text-white gap-2  bg-gray-400';
const notActivedStyle = 'px-4 py-2 flex items-center  gap-2 hover:bg-gray-400';

const AdminSideBar = () => {
	const [actived, setActived] = useState([]);
	const handleShowTabs = (tabID) => {
		if (actived.some((el) => el === tabID))
			setActived((prev) => prev.filter((el) => el !== tabID));
		else setActived((prev) => [...prev, tabID]);
	};
	return (
		<div className=" bg-gray-200 h-full py-4">
			<Link
				to={'/'}
				className="flex flex-col justify-center items-center p-4 gap-2"
			>
				<img src={logo} alt="logo" className="w-[160px] object-contain" />
				<small>Admin Workspace</small>
			</Link>
			<div>
				{adminSidebar.map((el) => (
					<Fragment key={el.id}>
						{el.type === 'SINGLE' && (
							<NavLink
								to={el.path}
								className={({ isActive }) =>
									clsx(isActive && activedStyle, !isActive && notActivedStyle)
								}
							>
								<span>{el.text}</span>
							</NavLink>
						)}
						{el.type === 'PARENT' && (
							<div
								onClick={() => handleShowTabs(+el.id)}
								className="px-4 py-2 flex flex-col"
							>
								<div className="flex items-center justify-between hover:bg-gray-400 cursor-pointer">
									<span>{el.text}</span>
									<AiOutlineCaretDown />
								</div>
								{actived.some((id) => +id === +el.id) && (
									<div className="flex flex-col pl-4">
										{el.submenu.map((item) => (
											<NavLink
												key={el.text}
												to={item.path}
												onClick={(e) => e.stopPropagation()}
												className={({ isActive }) =>
													clsx(
														isActive && activedStyle,
														!isActive && notActivedStyle
													)
												}
											>
												{item.text}
											</NavLink>
										))}
									</div>
								)}
							</div>
						)}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default memo(AdminSideBar);
