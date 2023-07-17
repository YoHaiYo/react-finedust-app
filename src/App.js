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
        </div>
      </div>
    )
  }
  const HeaderState = () => {
    return(
      <div>
        <span className='good'>😄좋음:~30</span>
        <span className='soso'>🙂보통:~80</span>
        <span className='bad'>😭나쁨:~150</span>
        <span className='very-bad'>👿매우나쁨:150~</span>
      </div>
    )
  }

  const [selectedSido, setSelectedSido] = useState('');
  const [numOfRows, setNumOfRows] = useState(10);
  const [isChoiceNumSelected, setIsChoiceNumSelected] = useState(false);

  const handleChangeSido = (event) => {
    const newSelectedSido = event.target.value;
    setSelectedSido(newSelectedSido);
    return (
      console.log('선택된 시/도 : ',newSelectedSido)
    )
  };
  const handleNumOfRowsChange = (event) => {
    const newNumOfRows = parseInt(event.target.dataset.rows, 10);
    setNumOfRows(newNumOfRows);
    setIsChoiceNumSelected(true);
    console.log('Selected number of rows:', newNumOfRows);
  };
  const SidoDropDown = () => {
    return(
        <div className='inner'>
          <div className='top-menu-bar choice-sido'>
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
          <div className='choice-num'>
            <span className='choice-num10' onClick={handleNumOfRowsChange} data-rows={10}>
              10개씩보기
            </span>
            <span className='choice-num20' onClick={handleNumOfRowsChange} data-rows={20}>
              20개씩보기
            </span>
            <span className='choice-num30' onClick={handleNumOfRowsChange} data-rows={30}>
              30개씩보기
            </span>
            {/* 최대가 전국 643개임 ! */}
            <span className='choice-num40' onClick={handleNumOfRowsChange} data-rows={643}> 
              전체보기
            </span>
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
    const numOfRows = numOfRows
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
        numOfRows: numOfRows,
        returnType: 'json',
        serviceKey: apiKey,
        ver: '1.0',
      };
      const queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
      return (`${baseURL}?${queryString}`);
    };

    const GetApiDataFunction = (selectedSido,numOfRows) => {
      // %3D%3D 는 == 을 의미한다. https://www.w3schools.com/tags/ref_urlencode.ASP 참고.
      const apiKey = 'Ikzw3SfvaxIdli8OxevjDkVYC5iCdUFCiSnzQXNuT81qkRZuwGA+9GTuGyRDBE7rDIMg3+kQJaRxk3ulGEMe9A==';
      const baseURL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
      const queryParams = {    
        // 시도이름(18개) : 전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
        sidoName: selectedSido,
        pageNo: 1,
        numOfRows: numOfRows,
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
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []); //, []해줘야 한번만 호출됨 !!

    /// ☆json파일로 데이터가져오기 : 서버오류일때 임시로 쓰기.
    // useEffect(() => {
    //   setItems(apiData.response.body.items);
    // }, []);
    
  // 기본 카드 구성
    return (      
      <div className='basecard-inner'>
        <SidoDropDown/>
        <div className='wrap-fixed'><HeaderState/></div>
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


  // 검색하기 스크린
  const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [items, setItems] = useState([]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(GetApiDataFunction('전국',643)); // 전국 totalCount=643개 이므로 여기서 검색해야 전체검색됨 !
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

    // 엔터키로 검색하게 하는 함수
    const handleKeyUp = (event) => {
      if (event.key === 'Enter') {
        handleSearchButtonClick();
      }
    };
    
  
    return (
      <div className='basecard-inner'>
        <div className='top-menu-bar'>
          <span className='wrap-search-input'>
            <input 
              className='search-input'
              type='text'
              placeholder='구/동/도로명으로 검색'
              value={searchText}
              onChange={handleSearchInputChange}
      
            />
          </span>
          <span className='wrap-search-btn'>
            <button className='search-btn' onClick={handleSearchButtonClick} onKeyUp={handleKeyUp}>검색</button>
          </span>
        </div>
        <div className='wrap-fixed'><HeaderState/></div>
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
        <div className='top-menu-bar'>★를 눌러 즐겨찾기 추가하기</div>
        <div className='wrap-fixed'><HeaderState/></div>
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

    

    // 메뉴스크린
    const MenuScreen = () => {

      return (
      <div className='menu-outer'>
        <div className='wrap-menu'>
          <div className='menu-1'>menu-1</div>
          <div className='menu-1'>menu-1</div>
          <div className='menu-1'>menu-1</div>
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
    };
    return (
      <div className='inner'>
        <div className="bottom-nav">
          <div className='bottom-nav-items'>
            <span
              className={`nav-item ${activeScreen === 'SearchScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('SearchScreen')}
            >
                      
              <span className="google-icon" class="material-symbols-rounded">search</span>
              
              <span className='nav-items-text'>지역 검색</span>
            </span>

            <span
              className={`nav-item ${activeScreen === 'HomeScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('HomeScreen')}
            >
              <div className='nav-items-icon'>
              <span class="material-symbols-rounded">home</span>
                </div>
              <span className='nav-items-text'>전체 지역보기</span>
            </span>

            <span
            className={`nav-item ${activeScreen === 'BookmarkScreen' ? 'active' : ''}`}
            onClick={() => handleScreenChange('BookmarkScreen')}
          >
              <div className='nav-items-icon'>
              <span class="material-symbols-rounded">star</span>
              </div>
              <span className='nav-items-text'>즐겨찾기</span>
            </span>
            
            <span
              className={`nav-item ${activeScreen === 'MenuScreen' ? 'active' : ''}`}
              onClick={() => handleScreenChange('MenuScreen')}
            >
              <div className='nav-items-icon'>
                <div className='menu-btn'>
                  <span class="material-symbols-rounded">menu</span>
                </div>
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