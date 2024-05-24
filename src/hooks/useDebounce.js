import React, {useEffect, useState} from 'react'

const useDebounce = (value, ms) => {

    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebounceValue(value)
        }, ms)

        return () => {
            clearTimeout(setTimeOutId )
        }
    }, [value, ms])

  return debounceValue
}

export default useDebounce

// khi nhập thay đổi giá thì sẽ gọi api
// => gọi api liên tục theo mỗi lượt nhập
// chỉ gọi api khi người dùng nhập xong
// dựa vào time onChange vd: 15s
//


// tách price nhập vào thành 2: 1 biến cập nhật ltuc 1 biến qua time onchange
// biến 1 hiện ở UI
// biến 2 biến dùng dể call api => settimeout => biến sẽ gán sau 1 time