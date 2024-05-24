import React, { memo, Fragment, useState } from 'react'
import avatar from 'assets/avatarDefault.png'
import { memberSidebar } from 'ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { useSelector } from 'react-redux'


const activedStyle = 'px-4 py-2 flex items-center text-white gap-2  bg-gray-400'
const notActivedStyle ='px-4 py-2 flex items-center  gap-2 hover:bg-gray-400'

const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current  } = useSelector(state => state.user)
    const handleShowTabs = (tabID) => {
        if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    }
  return (
    <div className=' bg-white h-full py-4 w-[250pxpx] flex-none'>
        <div className='w-full flex flex-col items-center justify-center py-4'>
            <img src={current?.avatar || avatar} alt='logo' className='w-16 h-16 object-cover' />
            <small>{`${current?.lastname} ${current?.firstname}`}</small>
        </div>
        <div>
            {memberSidebar?.map(el => (
                <Fragment key={el.id}>
                    {el.type === 'SINGLE' && <NavLink to={el.path} 
                    className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}>
                        <span>{el.text}</span>
                    </NavLink>} 
                    {el.type === 'PARENT' && <div onClick={() => handleShowTabs(+el.id)} className='px-4 py-2 flex flex-col'>
                            <div className='flex items-center justify-between hover:bg-gray-400 cursor-pointer'>
                                <span>{el.text}</span>
                                <AiOutlineCaretDown/>
                            </div>
                            {actived.some(id => +id === +el.id) && <div  className='flex flex-col pl-4'>
                                {el.submenu.map(item => (
                                    <NavLink 
                                    key={el.text} 
                                    to={item.path}
                                    onClick={e => e.stopPropagation()}
                                    className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}
                        
                    
                </Fragment>
            ))}
            <NavLink to={'/'} className={clsx(notActivedStyle)} >Trang chủ</NavLink>
        </div>
    </div>
  )
}

export default memo(MemberSidebar)