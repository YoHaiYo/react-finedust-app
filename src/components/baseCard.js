import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GetDataURL from'../api/api.js';
import './BaseCard.css'

const BaseCard  = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetDataURL());
        const data = await response.json();
        const fetchedItems = data.response.body.items;
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      
      <br></br>

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

export default BaseCard ;

// const Card = styled.div `
//   /* background-color: items.map에서 style 정의 */ 
//   width: 350px;
//   height: 100px;
// `