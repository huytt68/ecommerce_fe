import Button from 'components/buttons/Button';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { showCart } from 'store/app/appSlice';
import { formatMoney } from 'ultils/helpers';
import { ImBin } from "react-icons/im";
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncActions';
import { apiRemoveCart } from 'apis';
import path from 'ultils/path';

const Cart = ({dispatch, navigate}) => {
  const { currentCart } = useSelector(state => state.user)
  const removeCart = async (pid) => {
    const response = await apiRemoveCart(pid)
      if (response.success) { 
        dispatch(getCurrent())  
      }
      else toast.error(response.mes)
  }
  console.log(currentCart)
  return (
    <div onClick={e => e.stopPropagation()} className='w-[400px] h-screen bg-gray-700 grid grid-rows-10 text-white p-6'>
        <header className=' border-b border-gray-400 flex justify-between items-center row-span-1 h-full font-bold text-2xl'>
            <span>Your Cart</span>
            <span onClick={() => dispatch(showCart())}  className='p-2 cursor-pointer'><IoCloseCircle size={24}/></span>
        </header>
        <section className='row-span-7 gap-3 flex flex-col h-full max-h-full overflow-y-auto py-3'>
          {!currentCart && <span className='text-xs italic'>Your cart is empty</span>}
          {currentCart && currentCart.map(el => (
            <div key={el._id} className='flex justify-between items-center gap-2 '>
                <div className='flex gap-2'>
                  <img src={el.product?.thumb} alt="thumb" className='w-16 h-16 object-cover' />
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-orange-700'>{el.product?.title} </span>
                    <span className='text-[10px]'>{el.size}</span>
                    <span className='text-[10px]'>{`Quantity: ${el.quantity}`}</span>
                    <span className='text-[10px]'>{`Price: ${formatMoney(el.price)} VNĐ`}</span>
                  </div>
                </div>
                <span onClick={() => removeCart(el.product?._id)} className='h-8 w-8 items-center rounded-full hover:bg-gray-700 cursor-pointer justify-center'><ImBin size={16}/></span>
            </div>
          ))}
        </section>
        <div className='row-span-2 flex-col flex justify-between h-full '>
          <div className='flex items-center  justify-between pt-4 border-t'>
            <span>Subtotal:</span>
            <span>{formatMoney(currentCart.reduce((sum, el) => sum + Number(el.product?.price)* el?.quantity, 0)) + 'VNĐ'}</span>
          </div>
          <span className='text-center text-gray-200 italic text-xs'>Shipping, taxes, and discounts calculated at checkout</span>
          <Button handleOnClick={() => {
            dispatch(showCart())
            navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
          }} style='rounded-none w-full bg-main bg-main py-3'>Shopping cart</Button>
          
        </div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))