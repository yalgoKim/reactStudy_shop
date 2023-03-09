import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge, changeName } from '../store/userSlice.js'
import { addCount, deleteItem } from '../store.js'

function Cart(){

//    let a = useSelector((state)=>{ return state })
// state : store.js 에 들어있는 모든 state를 뜻함 / return과 {} 합쳐서 생략 가능
    // let cartTest = useSelector((state)=> state.cartTest ) // 내가 푼 과제코드
    let state = useSelector((state)=> state)
    //    console.log(a[0].name)

    // store.js로 요청을 보내주는 함수 dispatch
   let dispatch = useDispatch()

    return(
        <div>

            {state.user.age}살 {state.user.name}'s  cart
            <button onClick={()=>{
                dispatch(changeAge(10)) // dispatch(변경함수())
            }}>세월</button>

            <Table>
                <thead>
                    <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        cartTest.map(function(a){
                            return(
                                <tr>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td>버튼</td>
                            </tr>
                            )
                        })
                    } */}
                    {
                        state.cartTest.map((a, i) =>
                        <tr key={i}>
                            <td>{state.cartTest[i].id}</td>
                            <td>{state.cartTest[i].name}</td>
                            <td>{state.cartTest[i].count}</td>
                            <td>
                                <button onClick={()=>{
                                   dispatch(addCount(state.cartTest[i].id)) 
                                }}> + </button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(deleteItem(state.cartTest[i].id))
                                }}> 🗑 </button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;
