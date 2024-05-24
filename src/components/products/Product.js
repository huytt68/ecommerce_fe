import React, {memo, useState} from 'react'
import {formatMoney} from 'ultils/helpers'
import label from 'assets/label.png'
import labelGreen from 'assets/label-green.png'
import {renderStarFromNumber} from 'ultils/helpers'
import { SelectOption } from 'components' 
import icons from 'ultils/icons'
import { Link } from 'react-router-dom'
import path from 'ultils/path'
import { apiUpdateCart } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent'
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";

const {AiFillEye, BsFillHeartFill} = icons

const Product = ({productData, isNew, normal, navigate, dispatch}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const { current } = useSelector(state => state.user)
  
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation()
    if (flag ==='CART') {
      if (!current) return Swal.fire({
        title: 'Almost ...',
        text: 'Please login first',
        icon: 'info',
        cancelButtonText: 'Not now!',
        showCancelButton: true,
        confirmButtonText: 'Go login page'
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
      })
      const response = await apiUpdateCart({pid: productData._id,price: productData.price, size: productData.size})
      if (response.success) {
        toast.success(response.mes)
        dispatch(getCurrent())  
      }
      else toast.error(response.mes)
    }
    if (flag === 'WISHLIST') console.log('WISHLIST')
    // if (flag === 'QUICK_VIEW') console.log('QUICK VIEW')
  }
  

  //chi-tiet-san-pham/pid/title/asfdfdfgd
  return (
    <div className='w-full text-base  px-[10px]'>
      <div
      className='w-full border px-[15px] flex flex-col items-center'
      onClick={e => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
      onMouseEnter={e => {
        e.stopPropagation()
        setIsShowOption(true)
      } }
      onMouseLeave={e => {
        e.stopPropagation()
        setIsShowOption(false)
      }}
      >
        <div className='w-full relative'>
          {isShowOption && <div 
          className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
            {/* <span title='Quick view' onClick={(e) => handleClickOptions(e,'QUICK_VIEW')}><SelectOption icon={<AiFillEye/>}/></span> */}
            
            {current?.cart?.some(el => el.product === productData._id.toString()) 
            ? <span title='Added to Cart' ><SelectOption icon={<BsFillCartCheckFill color='green' />}/></span> 
            :  <span title='Add to Cart' onClick={(e) => handleClickOptions(e, 'CART')} ><SelectOption icon={<BsFillCartPlusFill />}/></span> }
            <span title='Add to WishList' onClick={(e) => handleClickOptions(e, 'WISHLIST')} ><SelectOption icon={<BsFillHeartFill/>}/></span>
          </div>}
          <img 
          src={productData?.thumb || 'https://i.pinimg.com/236x/16/aa/a7/16aaa707f8fedd1beadd12fa08b5f459.jpg'} 
          alt="" 
          className='w-[274px] h-[274px] mt-4  object-cover'
          />
          {!normal && <img src={isNew ? label : labelGreen} alt='' 
          className={`absolute w-[120px] top-[-18px] left-[-40px] object-contain`}/>}
          {!normal && 
          <span className={`font-bold top-[3px] left-[-12px] text-white absolute ${isNew ? '' : 'text-sm'}`}>{isNew ? 'New' : 'Trending'}</span>}        
          
        </div>
        <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
          <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}</span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ` } </span>
        </div>
      </div>
        
    </div>
  )
}

export default withBaseComponent(memo(Product))