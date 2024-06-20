

import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItem') !== null ? JSON.parse(localStorage.getItem('cartItem')):[]
const totalAmount = localStorage.getItem('totalAmount') !== null ? JSON.parse(localStorage.getItem('totalAmount')):0
const totalQuantity = localStorage.getItem('totalQuantity') !== null ? JSON.parse(localStorage.getItem('totalQuantity')):0

const setItemFunc = (item, totalAmount, totalQuantity)=>{
  localStorage.setItem('cartItem', JSON.stringify(item))
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))

}

const initialState = {
    cartItem: items,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addItem:(state, action) => {
        const newItem = action.payload
        const existingItem = state.cartItem.find(item=> item.id === newItem.id);
        state.totalQuantity++

        if(!existingItem){
            state.cartItem.push({
                id: newItem.id,
                title: newItem.title,
                imgUrl: newItem.imgUrl,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price
            })
        }
        else{
            existingItem.quantity++
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
        }

        state.totalAmount = state.cartItem.reduce((total, item)=> total+Number(item.price)*Number(item.quantity),0);
        console.log(state.totalQuantity);
        console.log(state.cartItem);
        console.log(newItem);

        setItemFunc(state.cartItem.map(item=>item),state.totalAmount,state.totalQuantity)
        // localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount))
        // localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity))
    },
    removeItem:(state, action)=>{
      const id = action.payload
      const existingItem = state.cartItem.find(item=>item.id === id)
      state.totalQuantity--

      if(existingItem.quantity === 1){
        state.cartItem = state.cartItem.filter(item=> item.id !== id)
      }

      else{
        existingItem.quantity--
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
      }
      state.totalAmount = state.cartItem.reduce((total, item)=> total+Number(item.price)*Number(item.quantity),0);

      setItemFunc(state.cartItem.map(item=>item),state.totalAmount,state.totalQuantity)
    },
    deleteItem:(state, action)=>{
        const id = action.payload
        const existingItem = state.cartItem.find(item=> item.id === id)
    
        if (existingItem){
            state.cartItem = state.cartItem.filter(item=> item.id !== id)
            state.totalQuantity = state.totalQuantity - existingItem.quantity
        }
        state.totalAmount = state.cartItem.reduce((total, item)=> total+Number(item.price)*Number(item.quantity),0);
        setItemFunc(state.cartItem.map(item=>item),state.totalAmount,state.totalQuantity)
      },
      
      updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const itemToUpdate = state.cartItem.find((item) => item.id === id);
    
        if (itemToUpdate) {
          state.totalQuantity = state.totalQuantity - itemToUpdate.quantity + quantity;
          itemToUpdate.quantity = quantity;
          itemToUpdate.totalPrice = Number(itemToUpdate.price) * quantity;
        }
    
        state.totalAmount = state.cartItem.reduce((total, item)=> total+Number(item.price)*Number(item.quantity),0);

      
      },
      resetCart: state => {
        state.cartItem = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
        localStorage.removeItem('cartItem');
        localStorage.removeItem('totalAmount');
        localStorage.removeItem('totalQuantity');
  },
},
  

  
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer