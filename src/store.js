import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cartTest = createSlice({
    name : 'cartTest',
    initialState : [
        {id : 0, name : '달콤한 호박 고구마', count : 2},
        {id : 2, name : '꿀맛나는 고구마', count : 1}
      ],
      reducers : {
        addCount(state, action){
          // let findItem = cartTest.find(v => v.id == action.payload ).count += 1
          let findItemNum = state.findIndex((a)=>{ return a.id === action.payload })
          state[findItemNum].count++
          },
        addItem(state, action){
          // state.push({id : 1, name : '달콤한 고구마', count : 1})
          state.push(action.payload)
          },
        deleteItem(state, action){
          let deleteItemNum = state.find((a)=>{ return a.id === action.payload })
          // console.log(deleteItem);
            for(let i = 0; i < state.length; i++){
              if(state[i] === deleteItemNum) {
                state.splice(i, 1);
                i--;
              }
            }
          }
      }
})

export let { addCount, addItem, deleteItem } = cartTest.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cartTest : cartTest.reducer
  }
})
