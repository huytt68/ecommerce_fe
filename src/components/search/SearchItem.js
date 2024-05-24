import React, {memo, useEffect, useState} from 'react'
import icons from '../../ultils/icons'
import {sizes} from '../../ultils/contants'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import path from '../../ultils/path'
import useDebounce from '../../hooks/useDebounce'

const {AiOutlineDown} = icons

const SearchItem = ({name, activeClick, changeActiveFilter, type = 'checkbox'}) => {
    const navigate = useNavigate()
    const {category} = useParams()
    const [selected, setSelected] = useState([])
    const [params] = useSearchParams()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el!==e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)

    }
    useEffect(() => {
        if (selected.length > 0){
            let param = []
            for (let i of params.entries()) param.push(i)
            const queries = {}
            for (let i of param) queries[i[0]] = i[1]
            queries.size = selected.join(',')
            queries.page = 1
            navigate({ 
                pathname: `/${category}`,
                search: createSearchParams(queries).toString()
            })
        } else {
            navigate(`/${category}`)
        }
    }, [selected])

    useEffect(() => {
        if (price.from && price.to && price.from > price.to) alert('Hãy nhập giá trên lớn hơn giá dưới')
    }, [price])

    const debouncePriceFrom = useDebounce(price.from, 1000)
    const debouncePriceTo = useDebounce(price.to, 1000)
    useEffect(() => {    
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1]
        const data = {}     
        if (Number(price.from)>0) queries.from = price.from
        if (Number(price.to)>0) queries.to = price.to
        queries.page = 1
        navigate({ 
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })  
    }, [debouncePriceFrom, debouncePriceTo])
    
  return (
    <div
        className='p-3 cursor-pointer text-gray-500 text-xs gap-6 relative border 
        border-gray-800 flex items-center justify-between'
        onClick={() => changeActiveFilter(name)}
    >
        <span className='capitalize'>{name}</span>
        <AiOutlineDown/>
        {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]'>
            {type === 'checkbox' 
            && <div className=''>
                <div className='py-4 items-center flex justify-between gap-8 border-b'>
                    <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                    <span onClick={e => {
                        e.stopPropagation()
                        setSelected([])
                    }} className='underline cursor-pointer hover:text-main'>Reset</span>
                </div>
                <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                    {sizes.map((el,index) => (
                        <div key={index} className='flex items-center gap-4'>
                            <input 
                                type="checkbox"
        
                                value={el}
                                onChange={handleSelect}
                                id={el}
                                checked={selected.some(selectedItem => selectedItem === el )}
                                className='form-checkbox'
                            />
                            <label className='capitalize text-gray-700'  htmlFor={el}>{el}</label>
                        </div>
                    ))}
                </div>            
            </div>
            }
            {type === 'input' && <div onClick={e => e.stopPropagation()}>
            <div className='py-4 items-center flex justify-between gap-8 border-b'>                   
                    <span onClick={e => {
                        e.stopPropagation()
                        setPrice({from: '', to: ''})
                        changeActiveFilter(null)
                    }} className='underline cursor-pointer hover:text-main'>Reset</span>
                </div>
                <div className='flex items-center gap-2 p-2'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='from'>From</label>
                        <input  
                        className='form-inputs' 
                        type="number" 
                        id="from"
                        value={price.from}
                        onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='to'>To</label>
                        <input 
                        className='form-inputs' 
                        type="number" 
                        id="to"
                        value={price.to}
                        onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                        />
                    </div>
                </div>
                </div>}
        </div>}
    </div>
  )
}

export default memo(SearchItem)