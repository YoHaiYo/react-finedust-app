import React, { useEffect, useState } from 'react';
// import BaseCard from './components/BaseCard.js';
// import SidoSelector from './components/SidoSelector.js';
import './App.css'
import apiData from './apiData.json';



function App() {

  const Header = () => {
    return(
      <header>
        <h2>미세먼지 알리미</h2>
        <span>좋음 : 0 ~ 30</span>
        <span> / 보통 : ~ 80</span>
        <span> / 나쁨 : ~ 150</span>
        <span> / 매우나쁨 : 150 ~</span>
        <hr/>
      </header>
    )
  }

  const [selectedSido, setSelectedSido] = useState('');
  const handleChangeSido = (event) => {
    const newSelectedSido = event.target.value;
    setSelectedSido(newSelectedSido);
    return (
      console.log(newSelectedSido)
    )
  };
  const SidoDropDown = () => {
    return(
      <select value={selectedSido} onChange={handleChangeSido}>
          <option value="전국">전국</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="대구">대구</option>
          <option value="인천">인천</option>
          <option value="광주">광주</option>
          <option value="대전">대전</option>
          <option value="울산">울산</option>
          <option value="경기">경기</option>
          <option value="강원">강원</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="전북">전북</option>
          <option value="전남">전남</option>
          <option value="경북">경북</option>
          <option value="경남">경남</option>
          <option value="제주">제주</option>
          <option value="세종">세종</option>
        </select>
    )
  }

  const GetApiData = () => {
    // fullURL : http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=10&returnType=json&serviceKey=Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA%2B9GTuGyRDBE7rDIMg3%2BkQJaRxk3ulGEMe9A%3D%3D&ver=1.0
    // %3D%3D 는 == 을 의미한다. https://www.w3schools.com/tags/ref_urlencode.ASP 참고.
    const baseURL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    // 시도이름(18개) : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
    const sidoName = selectedSido
    const pageNo = '1'
    const numOfRows = '10'
    const returnType = 'json'
    const apiKey = 'Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA+9GTuGyRDBE7rDIMg3+kQJaRxk3ulGEMe9A==';
    const ver = '1.0'
    return (
      `${baseURL}?sidoName=${sidoName}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=${returnType}&serviceKey=${apiKey}&ver=${ver}`
      );
  };

  const BaseCard  = () => {
    const [items, setItems] = useState([]);

    /// ★API 통신으로 데이터 가져오기 : 원래코드
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(GetApiData());
          const data = await response.json();
          const fetchedItems = data.response.body.items;
          setItems(fetchedItems);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    });

    /// ☆json파일로 데이터가져오기 : 서버오류일때 임시로 쓰기.
    // useEffect(() => {
    //   setItems(apiData.response.body.items);
    // }, []);

    // 미세먼지 수치에 따른 카드 색변경
    const getCardColor = (pm10Value) => {
      if (pm10Value === "-") {
        return '#acacac';
      } else if (pm10Value > 150) {
        return '#e67474';
      } else if (pm10Value > 80) {
        return '#f79036';
      } else if (pm10Value > 30) {
        return '#56ed5e';
      } else {
        return '#5190fc';
      }
    };
    // 미세먼지 수치에 따른 미세먼지 상태
    const getDustState = (pm10Value) => {
      if (pm10Value === "-") {
        return '오류';
      } else if (pm10Value > 150) {
        return '매우나쁨';
      } else if (pm10Value > 80) {
        return '나쁨';
      } else if (pm10Value > 30) {
        return '보통';
      } else {
        return '좋음';
      }
    };
    return (
      <div className='cardOuter'>
  
          {items.map((item, index) => (
            <div className='cardContainer' key={index}
            style={{
              backgroundColor: getCardColor(item.pm10Value),
            }}
            >
              <div className='sidoName'>시/도 : {item.sidoName}</div>
              <div className='stationName'>측정소 : {item.stationName}</div>
              <div className='dustValue'>미세먼지 치수 : {item.pm10Value}</div>
              <div className='outer-dustState'>
                <div className='dustState'>{getDustState(item.pm10Value)}</div>
              </div>
              <br></br>
              <br></br>
              <div className='dataTime'>({item.dataTime} 기준)</div>
            </div>
          ))}
      </div>
    );
  };

  // 앱 구성
  return (
    <div>
      <Header/>
      <SidoDropDown/>
      <BaseCard />
    </div>
  );
}

export default App;
