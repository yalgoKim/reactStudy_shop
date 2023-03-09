// let a = 10;

// object자료란?
// key:value값으로 저장되는 자료형, 
// 내가 원하는 데이터를 뽑을 땐 순서를 지정하는 것이 아니고(배열과의 차이점) key를 소환하면 그에 맞는 value값이 나옴


let data = [
    {
    id : 0,
    title : "달콤한 호박 고구마",
    content : "전라남도 해남",
    price : 120000
    },

    {
    id : 1,
    title : "담백한 밤고구마",
    content : "경기도 이천",
    price : 110000
    },

    {
    id : 2,
    title : "꿀맛나는 고구마",
    content : "충청남도 태안",
    price : 130000
    }
] 

export default data;

// 다른 파일에 있던 변수를 가져오려면 
// 1. 변수를 export하고 (export default a;)
// 2. App에서 import하면 됨

// 여러개의 변수를 export하려면 export {변수1, 변수2};
// 얘를 import 할 땐 import {변수1, 변수2} from '경로'; (주의) 작명 맘대로 하면 안됨
// 경로는 ./로 시작, 함수도 export 가능함