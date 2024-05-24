import React, { memo } from 'react'

const SelectOption = ({icon}) => {
  return (
    <div className='w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:text-white
    cursor-pointer hover:border-gray-800 hover:bg-black'>
        {icon}
    </div>
  )
}

export default memo(SelectOption)