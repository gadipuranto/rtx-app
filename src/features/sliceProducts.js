import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk("p/getProducts", async() => {
    const response = await axios.get('http://localhost:5000/products')
    return response.data
})

export const deleteProduct = createAsyncThunk("p/deleteProduct", async(id) => {
    await axios.delete(`http://localhost:5000/products/${id}`)
    return id
})

export const saveProduct = createAsyncThunk("p/saveProducts", async({title, price}) => {
    const response = await axios.post('http://localhost:5000/products', {
        title, price
    })
    return response.data
})

export const updateProduct = createAsyncThunk("p/updateProduct", async ({id, title, price}) => {
    const response = await axios.put(`http://localhost:5000/products/${id}`, {
        title, price
    })
    return response.data
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers: {
    //mengambil data dari api, kemudian datanya di set ke initial statenya
        [getProducts.fulfilled]: (state, action) => {
            //memasukkan semua data kedalam statenya
            productEntity.setAll(state, action.payload)
        },
        [saveProduct.fulfilled]: (state, action) => {
            //memasukkan semua data kedalam statenya
            productEntity.addOne(state, action.payload)
        },
        [deleteProduct.fulfilled]: (state, action) => {
            //memasukkan semua data kedalam statenya
            productEntity.removeOne(state, action.payload)
        },
        [updateProduct.fulfilled]: (state, action) => {
            //memasukkan semua data kedalam statenya
            productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        }
    }
    // initialState: {
    //     title : "asu",
    //     price : 0
    // },
    // reducers: {
    //     update : (state, action) => {
    //         state.title = action.payload.title
    //         state.price = action.payload.price
    //     }
    // }
})

//export action method
// export const{update} = productSlice.actions;

export const productSelector = productEntity.getSelectors(state => state.product)
//export reducer untuk digunakan di store.js reducer
export default productSlice.reducer;