import React, {memo, useState, useCallback} from 'react'
import {productInfoTabs} from '../../ultils/contants'
import { Button, VoteBar, VoteOption, Comment} from '..'
import { useDispatch, useSelector } from 'react-redux'
import {showModal} from '../../store/app/appSlice'
import { apiRatings} from '../../apis'
import Swal from 'sweetalert2'
import path from '../../ultils/path'
import { useNavigate } from 'react-router-dom'


const ProductInformation = ({ratings, nameProduct, pid, rerender}) => {
    const [activedTab, setActivedTab] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.user)
    const handleSubmitVoteOption = async ({comment, score}) => {
        console.log({comment, score, pid})
        if (!comment || !pid || !score) {
            alert('Hãy đánh giá trước khi gửi')
            return
        }
        await apiRatings({star: score, comment, pid, updatedAt: Date.now()})
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        rerender()
    }

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Đăng nhập trước khi đánh giá',
                cancelButtonText: 'Huỷ bỏ',
                confirmButtonText: 'Đăng nhập',
                title: 'Lỗi!',
                showCancelButton: true,
               
                
            }).then((rs) => { 
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
        } else {
            dispatch(showModal({
                isShowModal: true, 
                    modalChildren: <VoteOption nameProduct={nameProduct} 
                    handleSubmitVoteOption={handleSubmitVoteOption} />
            }))
        }
    }

  return ( 
    <div>
        
        <div className='flex items-center gap-2 relative bottom-[-1px]'>
            {productInfoTabs.map(el => (
                <span 
                className={`py-2 px-4 cursor-pointer
                ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'} `} 
                key={el.id}
                onClick={() => setActivedTab(el.id)}
                >
                    {el.name}
                </span>
            ))}
            {/* <div 
                className={`py-2 px-4 cursor-pointer
                ${activedTab === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'} `} 
                onClick={() => setActivedTab(5)}
                >
                    Đánh giá
                </div> */}
        </div>
        <div className='w-full border p-4'>
            {productInfoTabs.some(el => el.id === activedTab) 
            && productInfoTabs.find(el => el.id === activedTab)?.content}
            
            
        </div>
        
        <div className='flex  flex-col py-8 w-main'>
            
                {/* <div className='flex-4 border border-red-500'>
                    left
                </div>   
                <div className='flex-6 border gap-2  flex flex-col p-4'>
                    {Array.from(Array(5).keys()).reverse().map(el => (
                        <VoteBar
                            key={el}
                            number={el+1}
                        />
                    ))}
                </div>  */}
                <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                    <span>Hãy đánh giá sản phẩm này nhé!</span>
                    <Button handleOnClick={handleVoteNow}
                        >Đánh giá!</Button>
                </div>
                <div className='flex flex-col gap-4'>
                    {ratings?.map(el => (
                        <Comment
                        key={el._id}
                        star={el.star}
                        updatedAt={el.updatedAt}
                        comment = {el.comment}
                        name = {`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                        />
                    ))}
                </div>
            
                
        </div>
        
        
    </div>
  )
}

export default memo(ProductInformation)