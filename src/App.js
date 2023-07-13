import React, { useEffect, useState } from 'react';
import BaseCard from './components/BaseCard.js';
import SidoSelector from './components/SidoSelector.js';
import Hello from '../src/test/Hello.js';

function App() {

  return (
    <div>

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
