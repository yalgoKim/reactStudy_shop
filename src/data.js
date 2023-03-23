// let a = 10;

// object자료란?
// key:value값으로 저장되는 자료형, 
// 내가 원하는 데이터를 뽑을 땐 순서를 지정하는 것이 아니고(배열과의 차이점) key를 소환하면 그에 맞는 value값이 나옴


let data = [
    {
    id : 0,
    title : "수줍은 고구마",
    image : process.env.PUBLIC_URL + 'product1.png' ,
    content : "전라남도 해남",
    price : 50000
    },

    {
    id : 1,
    title : "춤추는 밤고구마",
    image : process.env.PUBLIC_URL + "product2.png" ,
    content : "경기도 이천",
    price : 70000
    },

    {
    id : 2,
    title : "휴식중인 고구마",
    image : process.env.PUBLIC_URL + "product3.png" ,
    content : "충청남도 태안",
    price : 90000
    },

    {
    id : 3,
    title : "촉촉한 고구마",
    image : process.env.PUBLIC_URL + "product4.png" ,
    content : "경기도 여주",
    price : 30000
    },

    {
    id : 4,
    title : "숙성중인 고구마",
    image : process.env.PUBLIC_URL + "product5.png" ,
    content : "경기도 포천",
    price : 30000
    },    

    {
    id : 5,
    title : "놀란 고구마",
    image : process.env.PUBLIC_URL + "product6.png" ,
    content : "강원도 횡성",
    price : 60000
    },   
    
    {
    id : 6,
    title : "뒹굴거린 고구마",
    image : process.env.PUBLIC_URL + "product7.png" ,
    content : "충청남도 서산",
    price : 50000
    },

    {
    id : 7,
    title : "빈곤한 고구마",
    image : process.env.PUBLIC_URL + "product8.png" ,
    content : "경기도 화성",
    price : 20000
    },  

    {
    id : 8,
    title : "빵터진 고구마",
    image : process.env.PUBLIC_URL + "product9.png" ,
    content : "제주도 서귀포",
    price : 100000
    },  
] 

export default data;

// 다른 파일에 있던 변수를 가져오려면 
// 1. 변수를 export하고 (export default a;)
// 2. App에서 import하면 됨

// 여러개의 변수를 export하려면 export {변수1, 변수2};
// 얘를 import 할 땐 import {변수1, 변수2} from '경로'; (주의) 작명 맘대로 하면 안됨
// 경로는 ./로 시작, 함수도 export 가능함