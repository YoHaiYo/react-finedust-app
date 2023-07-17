import React, { useEffect, useState } from 'react';
import './App.css'
import apiData from './apiData.json'

/// App함수 밖으로 빼서 전역함수로 만들기 ! 
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
      return '통신오류';
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
  // 미세먼지 수치에 따른 미세먼지 상태를 이모지로 보여줌
  const getEmojiState = (pm10Value) => {
    if (pm10Value === "-") {
      return '❔';
    } else if (pm10Value > 150) {
      return '👿';
    } else if (pm10Value > 80) {
      return '😭';
    } else if (pm10Value > 30) {
      return '🙂';
    } else {
      return '😄';
    }
  };
  // 즐겨찾기 추가 함수
  const BookmarkChange = ({ sidoName, stationName, pm10Value, dataTime }) => {
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
      const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
      const isItemBookmarked = bookmarkedItems.some(
        (item) =>
          item.sidoName === sidoName &&
          item.stationName === stationName &&
          item.pm10Value === pm10Value &&
          item.dataTime === dataTime
      );
      setIsClicked(isItemBookmarked);
    }, [sidoName, stationName, pm10Value, dataTime]);
    const handleClick = () => {
      // 다른 바텀네비바를 클릭하면 즐겨찾기에 저장된 상태가 초기화되서 localStorage로 상태 데이터를 유저의 로컬장치에 저장하는 방법을 사용.
      const updatedBookmarkList = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];  
      if (!isClicked) {
        const newItem = { sidoName, stationName, pm10Value, dataTime };
        updatedBookmarkList.push(newItem);
        setIsClicked(true);
      } else {
        const itemIndex = updatedBookmarkList.findIndex(
          (item) =>
            item.sidoName === sidoName &&
            item.stationName === stationName &&
            item.pm10Value === pm10Value &&
            item.dataTime === dataTime
        );
        if (itemIndex !== -1) {
          updatedBookmarkList.splice(itemIndex, 1);
          setIsClicked(false);
        }
      }
      // Update local storage with updated bookmarked items
      localStorage.setItem('bookmarkedItems', JSON.stringify(updatedBookmarkList));
      console.log(updatedBookmarkList)
    };
    
    return (
      <div className='bookmark' onClick={handleClick}>
        {isClicked ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
      </div>
    );
  };

function App() {

  const Header = () => {
    return(
      <div className='inner'>
        <div className='fixed-bar-top'>
          <span className='title'><img src="/img/finedust-logo.png" alt="title-logo"/></span>
          <span className='good'>😄좋음:~30</span>
          <span className='soso'>🙂보통:~80</span>
          <span className='bad'>😭나쁨:~150</span>
          <span className='very-bad'>👿매우나쁨:150~</span>
        </div>
      </div>
    )
  }

  const [selectedSido, setSelectedSido] = useState('');
  const handleChangeSido = (event) => {
    const newSelectedSido = event.target.value;
    setSelectedSido(newSelectedSido);
    return (
      console.log('선택된 시/도 : ',newSelectedSido)
    )
  };
  const SidoDropDown = () => {
    return(
        <div className='inner'>
          <div className='sido-dropdown'>
          <span>시/도를 선택하세요 ▶  </span>
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
          </div>
        </div>
    )
  }

  // # GetApiDataXXX 는 GetApiData와 같은 기능의 함수인데 더 직관적인거 같아서 비교안으로 남겨둡니다. 
  const GetApiDataXXX = () => {
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

  // GetApiData : API 통신할 URL주소를 관리하는 함수에요.
  const GetApiData = () => {
      // %3D%3D 는 == 을 의미한다. https://www.w3schools.com/tags/ref_urlencode.ASP 참고.
      const apiKey = 'Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA+9GTuGyRDBE7rDIMg3+kQJaRxk3ulGEMe9A==';
      const baseURL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
      const queryParams = {    
        // 시도이름(18개) : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
        sidoName: selectedSido,
        pageNo: 1,
        numOfRows: 20,
        returnType: 'json',
        serviceKey: apiKey,
        ver: '1.0',
      };
      const queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
      return (`${baseURL}?${queryString}`);
    };

  const BaseCard  = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
    const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
    setItems(bookmarkedItems);
  }, []);
    

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
    
  // 기본 카드 구성
    return (      
      <div className='basecard-inner'>
        <SidoDropDown/>
        <div className='cardOuter'>
            {items.map((item, index) => (
              <div className='cardContainer' key={index}
              style={{
                backgroundColor: getCardColor(item.pm10Value),
              }}
              >
                <div className='card-wrap-top'>
                  <div className='sidoName'>{item.sidoName}</div>
                  <BookmarkChange sidoName={item.sidoName} stationName={item.stationName} pm10Value={item.pm10Value} dataTime={item.dataTime} />
                  <div className='stationName'>{item.stationName}</div>
                </div>
                <div className='card-wrap-middle'>
                  <div className='emoji'>{getEmojiState(item.pm10Value)}</div>
                  <div className='dustState'>{getDustState(item.pm10Value)}</div>
                </div>
                <div className='dustValue'>미세먼지 : {item.pm10Value}</div>
                <div className='dataTime'>({item.dataTime} 기준)</div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // ------------ 임시 스크린 -----------
 
  const MenuScreen = () => {
    return <div style={{ backgroundColor: 'orange', height: '1000px' }}></div>;
  };
  // ------------------------------------

  // 검색하기 스크린
  const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [items, setItems] = useState([]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(GetApiData());
        const data = await response.json();
        const fetchedItems = data.response.body.items;
        const filteredItems = fetchedItems.filter(
          (item) => item.stationName.toLowerCase().includes(searchText.toLowerCase())
        );
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      if (isSearching) {
        fetchData();
      }
    }, [isSearching]);
  
    const handleSearchInputChange = (event) => {
      setSearchText(event.target.value);
    };
  
    const handleSearchButtonClick = () => {
      setIsSearching(true);
    };
  
    return (
      <div className='basecard-inner'>
        <div className='sido-dropdown'>
          <input 
            className='search-input'
            type='text'
            placeholder='구/동/도로명으로 검색'
            value={searchText}
            onChange={handleSearchInputChange}
    
          />
          <button className='search-btn' onClick={handleSearchButtonClick}>검색</button>
        </div>
        <div className='cardOuter'>
          {items.map((item, index) => (
            <div
              className='cardContainer'
              key={index}
              style={{
                backgroundColor: getCardColor(item.pm10Value),
              }}
            >
              {/* Render card contents */}
              <div className='card-wrap-top'>
                <div className='sidoName'>{item.sidoName}</div>
                <BookmarkChange
                  sidoName={item.sidoName}
                  stationName={item.stationName}
                  pm10Value={item.pm10Value}
                  dataTime={item.dataTime}
                />
                <div className='stationName'>{item.stationName}</div>
              </div>
              <div className='card-wrap-middle'>
                <div className='emoji'>{getEmojiState(item.pm10Value)}</div>
                <div className='dustState'>{getDustState(item.pm10Value)}</div>
              </div>
              <div className='dustValue'>미세먼지 : {item.pm10Value}</div>
              <div className='dataTime'>({item.dataTime} 기준)</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  

  // 즐겨찾기 스크린
  const BookmarkScreen = () => {
    const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
  
    return (
      <div className='basecard-inner'>
        
        <div className='cardOuter'>
          {bookmarkedItems.map((item, index) => (
            <div
              className='cardContainer'
              key={index}
              style={{
                backgroundColor: getCardColor(item.pm10Value),
              }}
            >
              <div className='card-wrap-top'>
                <div className='sidoName'>{item.sidoName}</div>
                <BookmarkChange
                  sidoName={item.sidoName}
                  stationName={item.stationName}
                  pm10Value={item.pm10Value}
                  dataTime={item.dataTime}
                />
                <div className='stationName'>{item.stationName}</div>
              </div>
              <div className='card-wrap-middle'>
                <div className='emoji'>{getEmojiState(item.pm10Value)}</div>
                <div className='dustState'>{getDustState(item.pm10Value)}</div>
              </div>
              <div className='dustValue'>미세먼지 : {item.pm10Value}</div>
              <div className='dataTime'>({item.dataTime} 기준)</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  

  const BottomNavigationBar = () => {
    const [activeScreen, setActiveScreen] = useState('HomeScreen');
    const [isClicked, setIsClicked] = useState(false);
    const handleScreenChange = (screen) => {
      setActiveScreen(screen);
      setIsClicked(true);
      // 각 바텀네비바에 후속 url 주소 추가
      switch (screen) {
        case 'SearchScreen':
          window.history.pushState(null, '', '/myplace');
          break;
        case 'HomeScreen':
          window.history.pushState(null, '', '/');
          break;
        case 'BookmarkScreen':
          window.history.pushState(null, '', '/bookmark');
          break;
        case 'MenuScreen':
          window.history.pushState(null, '', '/menu');
          break;
        default:
          break;
      }
    };
    return (
      <div className='inner'>
        <div className="bottom-nav">
          <div className='bottom-nav-items'>
            <span
              className={`nav-item ${activeScreen === 'SearchScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('SearchScreen')}
            >
              <div className='nav-items-icon'>              
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"/></svg>              
              </div>
              <span className='nav-items-text'>지역 검색</span>
            </span>
            <span
              className={`nav-item ${activeScreen === 'HomeScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('HomeScreen')}
            >
              <div className='nav-items-icon'>
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg> */}
              </div>
              <span className='nav-items-text'>전체 지역보기</span>
            </span>
            <span
            className={`nav-item ${activeScreen === 'BookmarkScreen' ? 'active' : ''}`}
            onClick={() => handleScreenChange('BookmarkScreen')}
          >
              <div className='nav-items-icon'>
              <svg width="30" height="30" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fill-rule="nonzero"/></svg>
              {/* <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg> */}
              </div>
              <span className='nav-items-text'>즐겨찾기</span>
            </span>
            <span
              className={`nav-item ${activeScreen === 'MenuScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('MenuScreen')}
            >
              <div className='nav-items-icon'>
              <svg width="30" height="30" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
              
              </div>
              <span className='nav-items-text'>메뉴</span>
            </span>
          </div>
        </div>
        {/* 스크린선택 */}
        <div className="content">
          {activeScreen === 'SearchScreen' && <SearchScreen />}
          {activeScreen === 'HomeScreen' && <BaseCard />}
          {activeScreen === 'BookmarkScreen' && <BookmarkScreen />}
          {activeScreen === 'MenuScreen' && <MenuScreen />}
        </div>
      </div>
    );
  };

  

  // 앱 구성
  return (
    <div>
      <Header/>
      <BottomNavigationBar/>
    </div>
  );
}

export default App;