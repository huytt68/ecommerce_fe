import { createSlice, current } from "@reduxjs/toolkit";
import * as actions from './asyncActions' 

export const userSlide = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: '',
        currentCart: []
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
            state.mes = ''
        },
        clearMessage: (state) => {
            state.mes = ''
        },
        updateCart: (state, action) => { 
            const {pid , quantity} = action.payload
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
            console.log([...updatingCart])
            state.currentCart = updatingCart.map(el => {
                if (el.product?._id === pid) {
                    return {...el, quantity}
                }  else return el
               
            })
            console.log(state.currentCart)
            
        }
    }, 
    //Code logic xử lý async action
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn =true;
            state.currentCart = action.payload.cart
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Phiên đăng nhập đã hết hạn hãy đăng nhập lại!'
        });
}
})

export const { login, logout, clearMessage, updateCart } = userSlide.actions

export default userSlide.reducer