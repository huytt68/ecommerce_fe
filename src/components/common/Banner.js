import React, { memo } from 'react'

const Banner = () => {
    return (
        <div className='w-full'>
            <img src='https://theme.hstatic.net/200000580329/1000937158/14/slide_2_img.jpg'
            alt='banner'
            className='h-[400px] w-full object-cover'
            />
            </div>
    )
}

export default memo(Banner)