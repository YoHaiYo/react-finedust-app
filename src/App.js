import React, { useEffect, useState } from 'react';
import BaseCard from './components/BaseCard.js';
import SidoSelector from './components/SidoSelector.js';
import Hello from '../src/test/Hello.js';

function App() {
  
  const [name, setName] = useState('react');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>

      <div>
        <select value={name} onChange={handleNameChange}>
          <option value="전국">전국</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
        </select>
        <Hello name={name} />
      </div>

      <h1>미세먼지 알리미</h1>
      <span>좋음 : 0 ~ 30</span>
      <span> / 보통 : ~ 80</span>
      <span> / 나쁨 : ~ 150</span>
      <span> / 매우나쁨 : 150 ~</span>

      <SidoSelector/>
      <BaseCard />

    </div>
  );
}

export default App;
