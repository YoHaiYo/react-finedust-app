import React, { useState } from 'react';

const SidoSelector = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  // 시도이름 : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
  return (
    <div>
      <label htmlFor="city">시/도를 선택하세요 </label>
      <select id="city" value={selectedCity} onChange={handleCityChange}>
        <option value="">----</option>
        <option value="전국">전국</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        {/* Add more cities here */}
      </select>
      {/* {selectedCity && <p>You selected: {selectedCity}</p>} */}
    </div>
  );
};

export default SidoSelector;


