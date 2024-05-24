import { current } from '@reduxjs/toolkit'
import { apiUpdateCurrent } from 'apis'
import { Button, InputForm } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'

const Personal = ({navigate}) => {
  const {register, formState: {errors, isDirty}, handleSubmit, reset} = useForm()
  const {current} =useSelector(state => state.user)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      address: current?.address,
      
    })
  },[current])
  const handleUpdateInfo =async (data) => {
    const response = await apiUpdateCurrent (data)
    if (response.success) {
      dispatch(getCurrent())
      toast.success(response.mes)
      if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
    } else toast.success(response.mes)
  }
  
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b-blue-200'>
        Thông tin cá nhân
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
      <InputForm
            label='Firstname'
            register={register}
            errors={errors}
            id='firstname'
            validate={{
              required: 'Need fill field'
            }}
        />
      <InputForm
            label='Lastname'
            register={register}
            errors={errors}
            id='lastname'
            validate={{
              required: 'Need fill field'
            }}
        />
      <InputForm
            label='Email'
            register={register}
            errors={errors}
            id='email'
            validate={{
              required: 'Need fill field',
              pattern: {
                value:  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                message: 'Email invalid'
              }
            }}
      />
      <InputForm
            label='Phone'
            register={register}
            errors={errors}
            id='mobile'
            validate={{
              required: 'Need fill field',
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: 'Phone invalid.'
              }
            }}
      />
      <InputForm
            label='Address'
            register={register}
            errors={errors}
            id='address'
            validate={{
              required: 'Need fill field',
              
            }}
      />
      <div className='flex items-center gap-2'>
        <span className='font-medium'>Role:</span>
        <span>{current?.role} </span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-medium'>Create At:</span>
        <span>{moment(current?.createdAt).format("DD/MM/YYYY")} </span>
      </div>

      {isDirty && <div className='w-full flex justify-end'><Button type='submit'>Update</Button></div>}
      </form>
    </div>
  )
}

export default withBaseComponent(Personal)