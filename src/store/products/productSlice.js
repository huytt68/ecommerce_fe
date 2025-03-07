import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "./asyncActions";

export const productSlide = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
        
    },
    reducers: {
      
    },


    // Code logic xử lý async action
  extraReducers: (builder) => {
    
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true;
    });

  
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    builder.addCase(getNewProducts.rejected, (state, action) => {
      
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
}
})


export default productSlide.reducer