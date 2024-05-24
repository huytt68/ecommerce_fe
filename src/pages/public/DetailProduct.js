import React, {useCallback, useEffect, useState} from 'react'
import {createSearchParams, useParams} from 'react-router-dom'
import { apiGetProduct, apiUpdateCart } from '../../apis'
import { Breadcrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInformation, CustomSlider } from '../../components'
import Slider from 'react-slick' 
import { formatMoney, renderStarFromNumber } from '../../ultils/helpers'
import {productExtraInformation} from '../../ultils/contants'
import DOMPurify from 'dompurify';
import { getCurrent } from 'store/user/asyncActions'
import withBaseComponent from 'hocs/withBaseComponent'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'ultils/path'


const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}; 

const DetailProduct = ({ dispatch, location, navigate}) => {

  const {pid, title, category} = useParams()
  const {current} = useSelector(state => state.user)
  const [product, setProduct] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(null)
  const [price, setPrice] = useState(0)
  const [update, setUpdate] = useState(false)
  //const [relatedProducts, setRelatedProducts] = useState(null)
  // console.log(pid, title)
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if (response.success) {
      setProduct(response.productData)
      setCurrentImage(response?.productData?.thumb)
      setSize(response?.productData?.size)
      setPrice(response?.productData?.price)
    }
    // console.log('>>>', response)
  }
  useEffect(() => {
    if (pid) {
      fetchProductData()
      // fetchProducts()
    }
    window.scrollTo(0, 0)
  }, [pid])

  useEffect(() => {
    if (pid) fetchProductData()
    
  }, [update])

  const rerender = useCallback(() => { 
    setUpdate(!update)
   },[update])

  const handleQuantity = useCallback((number) =>{
    if (!Number(number) || Number(number) < 1) {
      return
    } else setQuantity(number)
    
  }, [quantity])
  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity === 1) return 
    if (flag === 'minus') setQuantity(prev => +prev - 1)
    if (flag === 'plus') setQuantity(prev => +prev + 1)

  }, [quantity])

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el)
  }

  const handleAddToCart = async() => { 
    if (!current) return Swal.fire({
      title: 'Almost ...',
      text: 'Please login first',
      icon: 'info',
      cancelButtonText: 'Not now!',
      showCancelButton: true,
      confirmButtonText: 'Go login page'
    }).then((rs) => {
      if (rs.isConfirmed) navigate({
        pathname: `/${path.LOGIN}`,
        search: createSearchParams({redirect: location.pathname}).toString()
      })
    })
    
    

    const response = await apiUpdateCart({pid, quantity, size, price})
    // console.log(response)
    if (response.success) {
      toast.success(response.mes)
      dispatch(getCurrent())  
    }
    else toast.error(response.mes)
  }

  return (
    <div className='w-full '>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold'>{title}</h3>
          <Breadcrumb title={title} category={category}/>
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex flex-col gap-4 w-2/5'>
          <img src={currentImage} alt="product" className='h-[458px] w-[458px] border object-cover' /> 
          <div className='w-[458px]'>
            <Slider className='image-slider flex gap-2 justify-between' {...settings}>
              {product?.images?.map(el => (
                <div className='' key={el}>
                  <img onClick={e => handleClickImage(e, el)} src={el} alt="sub-product" className='h-[143px] w-[143px] cursor-pointer  border object-cover'/>
                </div>
              ))}
            </Slider>
          </div> 

        </div>
        <div className='pr-[24px] w-2/5 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[30px] font-semibold'>{`${formatMoney(product?.price)} VNĐ`}</h2>
            <span className='text-sm text-main' >{`Kho: ${product?.quantity}`} </span>
          </div>
          <div className='flex items-center gap-1'>
            {renderStarFromNumber(product?.totalRatings)?.map((el,index) => (<span key={index}>{el}</span>))}
            <span className='text-sm text-main italic'>{`(Đã bán: ${product?.sold} cái)`} </span>
          </div>
          <ul className='list-square text-sm text-gray-500 pl-4'>
            {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-6' key={el}>{el}</li>))}
            {product?.description?.length === 1 && <div className='text-sm line-clamp-[10] mb-8' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0]) }}></div>}
          </ul>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-4'>
              <span className='font-semibold'>Số lượng</span>
              <SelectQuantity 
              quantity={quantity} 
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button handleOnClick={handleAddToCart} fw>
                Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className='w-1/5'>
          {productExtraInformation.map(el => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              icon = {el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className='w-main m-auto mt-8'>
        <ProductInformation 
        ratings={product?.ratings}
        nameProduct={product?.title}
        pid={product?._id}
        rerender={rerender}
        />
      </div>
      {/* <div className='w-main m-auto mt-8'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>Sản phẩm tương tự</h3>
          <CustomSlider products={relatedProducts}/> 
      </div> */}
      <div className='h-[100px] w-full'></div>
    </div>
  )
}

export default withBaseComponent(DetailProduct)