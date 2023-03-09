import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({ // useState() 역할, state하나를 slicce라고 부름
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
    changeName(state){
        // return 'john kim,state를 수정해주는 함수임' + state 단순 값 변경할 땐 이렇게 하고
        // return {name : 'park', age : 20} // 이렇게 값을 다 써줄 수도 있고
        state.name = 'park' // 이렇게 키값으로 값 설정도 가능
    }, 
    changeAge(state, action){ 
        // 함수의 파라미터 사용 : action로 뚫어서 쓰면 changeAge(10) 할 경우 10씩 증가임, changeAge(20)하면 20씩 증가
        // 뒤에 꼭 payload 붙여줘야 함.. (a 대신 action쓰는건 관례)
        state.age += action.payload
    }
    }
})

// 2. 만든 함수를 export한다
export let { changeName, changeAge } = user.actions

// 분할은 그냥 이렇게 잘라서 쓰면 돼
export default user;