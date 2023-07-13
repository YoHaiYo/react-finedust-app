// // SidoSelector.js

// import React, { useState } from 'react';
// import GetDataURL from '../api/api.js';

// const SidoSelector = () => {
//   const [selectedCity, setSelectedCity] = useState('');

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };
//   // 시도이름 : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
//   return (
//     <div>
//       <br></br>
//       <span>시/도를 선택하세요. </span>
//       <select value={selectedCity} onChange={handleCityChange}>
//         <option value="">----</option>
//         <option value="전국">전국</option>
//         <option value="서울">서울</option>
//         <option value="부산">부산</option>
//         <option value="apple">apple</option>
//         {/* Add more cities here */}
//       </select>
//       <GetDataURL selectedSidoName={selectedCity} />
//     </div>
//   );
// };

// export default SidoSelector;

// // api.js

// import SidoSelector from "../components/SidoSelector";
// // import React from 'react';

// /// API URL 쪼개기
// // http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=10&returnType=json&serviceKey=Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA%2B9GTuGyRDBE7rDIMg3%2BkQJaRxk3ulGEMe9A%3D%3D&ver=1.0

// const GetDataURL = ({ selectedSidoName }) => {
  
//   // %3D%3D 는 == 을 의미한다. https://www.w3schools.com/tags/ref_urlencode.ASP 참고.
//   const apiKey = 'Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA+9GTuGyRDBE7rDIMg3+kQJaRxk3ulGEMe9A==';
//   const baseURL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
  
//   // const selectedSidoName = '서울'

//   const queryParams = {

//     // 시도이름 : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
//     sidoName: selectedSidoName,
//     pageNo: 1,
//     numOfRows: 20,
//     returnType: 'json',
//     serviceKey: apiKey,
//     ver: '1.0',
//   };
  

//   const queryString = Object.keys(queryParams)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
//     .join('&');

//   return `${baseURL}?${queryString}`;
// };

// export default GetDataURL 