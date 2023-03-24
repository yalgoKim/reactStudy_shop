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
import navi from './navi.js';

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])

  let navigate = useNavigate();
  let [btnCount, setBtnCount] = useState(3); // 유저가 버튼 누른 횟수를 state로 지정
  let [sweetPotato, setSweetPotato] = useState(data.slice(0,3));
  let [loading, setLoading] = useState(false); // 로딩창 스위치
  let [navList, setNavList] = useState(navi);

  // react-query 이용해서 ajax 요청하기
  let result = useQuery(['userName'], async ()=>
    await axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data})
    )

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="http://localhost:3000/">SweetPotato Shop</Navbar.Brand>
          <Nav className="me-auto">
            {
              navList.map((path) => {
                return(
                  <Nav.Link onClick={()=>{ navigate( path.to )}}> { path.title } </Nav.Link>
                )
              })
              }
            
          </Nav>
          <Nav className="ms-auto"> 
          { result.isLoading && '로딩중' }
          { result.error && '에러남' }
          { result.data && result.data.name } 님 반가워요 ! 
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
                  sweetPotato.map((item, i) => {
                    return(
                      // <Item shoes={shoes[i]} i = {i} navigate = {navigate}></Item> // 기존 코드
                      <ProductList key={i} sweetPotato={item} i = {i} navigate={navigate}></ProductList> // 변수명 정의가 명확하도록 이름 바꿔주기, 그리고 a대신 요소를 직접 넣어줘도 됨
                    )
                  })
                }
              </div>
            </div>
            <br></br>
            {btnCount < 10 ? 
            <button className="btn btn-default" onClick={()=>{
              setBtnCount((prev) => {
                prev = prev + 3
                setLoading(true);
                let copy = [...data.slice(0, btnCount)];
                setSweetPotato(copy);
                return prev;
              })
            }}> more </button> 
            : null}
          </>
        } />
        <Route path='/detail/:id' element={ <CardDetail sweetPotato = {sweetPotato} /> }></Route>
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

const ProductList = (props)=>{
  return(
    <div className="col-md-4">
      <img src = {props.sweetPotato.image} width="80%" height="60%" />
      <h5>{props.sweetPotato.title}</h5>
      <p>{props.sweetPotato.content}</p>
      <p>{props.sweetPotato.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      {/* detail 버튼 추가 */}
      <button className="btn btn-success" onClick={() => {
        props.navigate('/detail/'+ props.i );

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
    </div>
  )
}


export default App;
