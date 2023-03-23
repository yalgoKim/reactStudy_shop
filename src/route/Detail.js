import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../store.js";

function CardDetail(props){

    let [show, setShow] = useState(true);
    let {id} = useParams();
    let [text, setText] = useState('');
    let [check, setCheck] = useState(false);
    let dispatch = useDispatch()

    useEffect(()=>{
        // 현재 페이지의 상품정보, id정보
        console.log(props.sweetPotato.find(isTrue).id);
        // 아래처럼 짜면 기존 데이터 '대체'임
        // localStorage.setItem('watched', [props.shoes.find(isTrue).id])

        // 로컬스토리지에서 데이터 꺼내서 수정하려면 먼저 꺼내야 함, 꺼낸건 JSON이라 object로 다시 변환해줌
        let recentItem = JSON.parse(localStorage.getItem('watched'));

        // 꺼낸 자료에 오브젝트를 추가하려면 push하면 됨
        recentItem.push(props.sweetPotato.find(isTrue).id)

        // // 중복값 제거를 위해 Set으로 넣어주고,
        // recentItem = new Set(recentItem);
        
        // // 넣어준 뒤에 다시 Array자료로 변환시켜줌
        // recentItem = Array.from(recentItem);

        recentItem = [ ...new Set(recentItem)]

        // 오브젝트가 추가된 자료를 다시 로컬 스토리지에 넣어주기(넣을 때 Json으로 다시 변환해서!)
        localStorage.setItem('watched', JSON.stringify(recentItem))
    }, [])

    function isTrue(element) {
            return element.id == id
    }

    useEffect(() => {
        let a = setTimeout(() => { setShow(false) }, 2000);
        // text값이 Nan(숫자가 아닌 경우)일 때 check값을 true로 바꿔줌 아.. 코딩애플 선생님은 걍 alert 띄웠네 ? 
        if(isNaN(text)) return setCheck(true);
        // isNaN(text) ? console.log("문자") : console.log("숫자임");
            return() => {
            clearTimeout(a);
            setCheck(false);
        }
    })

    return(
        <div className="container">

            { show ? <Timeout/> : null }
            {/* 경고창을 띄워줄 스위치 설정(false면 안보이게) */}
            {/* { check == false ? null : <InputCheck/> } */}
            { check == true ? <InputCheck/> : null }

            <div className="row">
                <div className="col-md-6">
                {/* <img src = { process.env.PUBLIC_URL + '../'+ id +'.png'} width="100%"/> */}
                <img src = { '../' + props.sweetPotato.find(isTrue).image } />
                </div>
            <div className="col-md-6">
                <h4 className="pt-5">{ props.sweetPotato.find(isTrue).title }</h4>
                <p>{props.sweetPotato.find(isTrue).content}</p>
                <p>{props.sweetPotato.find(isTrue).price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <button className="btn btn-danger" onClick={()=>{
                    dispatch(addItem({id : props.sweetPotato.find(isTrue).id , name : props.sweetPotato.find(isTrue).title , count : 1}))
                }}>주문하기</button> 
                <br></br><br></br><br></br>
                <input onChange={(e) => {
                    // 입력받은 값을 int로 형변환해서 text state에 넣어줌
                    setText(e.target.value)
                    console.log(text);
                }}></input>
            </div>
        </div>
    </div> 
    )
    
    function Timeout (){
    return(
        <div className="alert alert-warning">
            2초 이내 구매 시 할인
        </div>
        )
    }

    function InputCheck (){
        return(
            <div className="alert alert-danger">
                숫자만 입력 가능합니다
            </div>
        )
    }
}

export default CardDetail;