import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getDataURL from'./api/api.js';

const BaseCard  = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getDataURL());
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
      return '알 수 없음';
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
    <div>
      <h1>미세먼지 알리미</h1>
      <span>좋음 : 0 ~ 30</span>
      <span> / 보통 : ~ 80</span>
      <span> / 나쁨 : ~ 150</span>
      <span> / 매우나쁨 : 150 ~</span>
      <Card>
        {items.map((item, index) => (
          <div key={index}
          style={{
            backgroundColor: getCardColor(item.pm10Value),
            width: '300px',
            height: '180px'
          }}
          >
            <p>시/도 : {item.sidoName}</p>
            <p>측정소 : {item.stationName}</p>
            <p>미세먼지 치수 : {item.pm10Value}</p>
            <p>미세먼저 상태 : {getDustState(item.pm10Value)}</p>
            <p>기준시각 : {item.dataTime} </p>
            <br></br>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default BaseCard ;

const Card = styled.div `
  /* background-color: items.map에서 style 정의 */
  /* width: 350px; */
  /* height: 100px; */
`