// /* eslint-disable */
import './App.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Link, Route, useNavigate, Outlet } from 'react-router-dom'
import CardDetail from './route/Detail.js';
import axios from 'axios';
import Cart from './route/Cart.js';
import { useQuery } from '@tanstack/react-query';

function App() {
  
  // // 로컬스토리지에 json형태로 자료 저장
  // localStorage.setItem('data', JSON.stringify(obj))
  // let carryOut = localStorage.getItem('data')
  // // json으로 꺼낸거 다시 변환해주기(오브젝트 형으로 사용 가능)
  // console.log(JSON.parse(carryOut).name);

  useEffect(()=>{
    // 응용 : 이미 watched항목이 있으면  setItem 하지 말아주세요 (if문 쓰기)
    
    localStorage.setItem('watched', JSON.stringify([]))
  },[])


  let navigate = useNavigate();
  let [shoes, setShoes] = useState(data);
  let [btnCount, setBtnCount] = useState(2); // 유저가 버튼 누른 횟수를 state로 지정
  let [loading, setLoading] = useState(false); // 로딩창 스위치

  // 기존 data ajax요청해서 가져오는 법
  // axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
  //   a.data
  // })

  // react-query 이용해서 ajax 요청하기
  let result = useQuery('userName', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data})
    )
  // useQuery로 감싸면 장점
  // 1. 성공/실패/로딩중 쉽게 파악가능
  // 2. 틈만나면 자동으로 재요청해줌
  // 3. 실패 시 retry 알아서 해줌
  // 4. state를 공유 안해도 됨
  // 5. ajax 결과 캐싱기능 (12시 10분에 실행한 get요청, 12시 13분에 새롭게 요청하면 기존에 get한 자료를 가져다줌, 좀 빠름 )




  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">SweetPotato Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link> 
            <Nav.Link onClick={() => { navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event')}}>고구마대피소</Nav.Link>
          </Nav>
          <Nav className="ms-auto"> 
          { result.isLoading ? '로딩중' : result.name } 님 반가워요!
          {console.log(result)}


          {/* &&으로 if문대신 사용 가능 */}
          {/* { result.isLoading && '로딩중' }
          { result.error && '에러남' }
          { result.data && result.data.name } 님 반가워요 !  */}
          </Nav>

        </Container>
      </Navbar>
      {
        loading == true ? <Loading /> : null
      }
      <Routes>
        <Route path='/' element={ 
          <>
            <div className="main-bg"></div>
            <br></br><br></br>
            <div className="container">
              <div className="row">
                {
                  shoes.map((item, i) => {
                    return(
                      // <Item shoes={shoes[i]} i = {i} navigate = {navigate}></Item> // 기존 코드
                      <ShoesList key={i} shoes={item} i = {i} navigate={navigate}></ShoesList> // 변수명 정의가 명확하도록 이름 바꿔주기, 그리고 a대신 요소를 직접 넣어줘도 됨
                    )
                  })
                }
              </div>
            </div>
            <br></br>
            {/* (과제) 로딩중 UI 띄우기, 한번 더 누르면 7~9번 데이터 가져오는 기능 구현 */}
            <button className="btn btn-default" onClick={()=>{
              setLoading(true);
              setBtnCount(btnCount + 1);
                axios.get('https://codingapple1.github.io/shop/data' + (btnCount) + '.json')
                .then((result)=>{ 
                  let copy = [...shoes].concat(result.data) // 배열끼리 합쳐주기 
                  console.log({copy})
                  setShoes(copy);
                // (과제) 로딩중 UI 숨기기
                setLoading(false);
                })
                .catch(()=>{
                  // (과제) 로딩중 UI 숨기기
                  setLoading(false);
                  console.log('404error')
                  alert('상품이 존재하지 않습니다')
                })
            }}> more </button>
            
          </>
        } />
        <Route path='/detail/:id' element={ <CardDetail shoes = {shoes} /> }></Route>
        <Route path="/cart" element={<Cart/> } />
        <Route path='/about' element={ <About></About> }>
          <Route path="location" element={<div>위치정보</div>}></Route>
          <Route path="member" element={<div>멤버정보</div>}></Route>
        </Route>
        <Route path='/event' element={ <Event/> }>
          <Route path="one" element={<div>첫 주문 시 호박고구마 서비스</div>}></Route>
          <Route path="two" element={ <div> 생일 기념 고구마 받기 </div>}></Route>
        </Route>
        <Route path='*' element={<div>404 ERROR</div>}></Route>
      </Routes>
    </div>
  );
}

const ShoesList = (props)=>{
  return(
    <div className="col-md-4">
      <img src={ process.env.PUBLIC_URL + '/'+( props.i )+'.png'} width="80%" height="60%" />
      {/* <img src={ process.env.PUBLIC_URL + '/1.jpg'} width="80%" height="60%" /> */}
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      {/* detail 이동하기 귀찮아서 버튼 추가 */}
      <button className="btn btn-success" onClick={() => {
        props.navigate('/detail/'+ props.i );

        // 최근 본 상품 저장하는거... 여기에 onClick 주는게 아니었구나.. 
        // let recentItemSet = new Set();
        // let recentItem = JSON.parse(localStorage.getItem('watched'));
        // console.log(recentItem);
        // recentItemSet.add(recentItem.id);
        // localStorage.setItem('watched', JSON.stringify([recentItemSet]));
        // localStorage.setItem('watched', JSON.stringify([]))
    }}>상세보기</button> 
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  )
}

function Loading(){
  return(
    <div className="alert alert-Success">
    {alert('로딩중입니다')}
    로딩중입니다
    </div>
  )
}


export default App;
