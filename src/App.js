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

  /// js기본문법 - 스벅 프로모션 ↑ 접어었다펴기
  // const promotionEl = document.querySelector('.wrap-menu'); // 펼쳤다 접을 클래스
  // const promotionToggleBtn = document.querySelector('.menu-btn') // 버튼으로 쓸 클래스
  // let isHidePromotion = false;
  // promotionToggleBtn.addEventListener('click', function() {
  //   // 클릭할때마다 참,거짓 반전시켜서 토글 열었다 닫았다하는거임.
  //   isHidePromotion = !isHidePromotion
  //   if (isHidePromotion) {
  //     // 숨김 처리
  //     promotionEl.classList.add('hide');
  //   } else {
  //     // 보임 처리
  //     promotionEl.classList.remove('hide');
  //   }
  // });
  

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

  const [selectedSido, setSelectedSido] = useState('서울');
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

    // 검색용으로 전체 시도의 모든 측정소를 불러오는 함수입니다.
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
    const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false); // Set loading state to false after data is fetched
          console.log(data);
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
        {isLoading ?  // Conditionally render the loading window
        (<div className='loading-window'>
          <SidoDropDown/>
          <div className='wrap-fixed'><HeaderState/></div>
          <div className='loading-item'>
            <div className='loading-gif'>
              <img src="https://blog.kakaocdn.net/dn/tQqCo/btsn1J2ez24/K7bPC391gbHZikQCTyfAyK/img.gif" alt="loading"/>
            </div>
            <div className='loading-text'>데이터를 불러오는 중입니다...</div>
          </div>
        </div>) : 
        (<React.Fragment>
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
        </React.Fragment>
      )}
      </div>
    );
  };


  // 검색하기 스크린
  const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchData = async () => {
      try {
        const response = await fetch(GetApiDataFunction('전국',643)); // 전국 totalCount=643개 이므로 여기서 검색해야 전체검색됨 !
        const data = await response.json();
        const fetchedItems = data.response.body.items;
        setIsLoading(false); // Set loading state to false after data is fetched
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
        setIsLoading(true);
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
        {isLoading ?  // Conditionally render the loading window
        (<div className='loading-window'>
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
          <div className='loading-item'>
            <div className='loading-gif'>
              <img src="https://blog.kakaocdn.net/dn/tQqCo/btsn1J2ez24/K7bPC391gbHZikQCTyfAyK/img.gif" alt="loading"/>
            </div>
            <div className='loading-text'>데이터를 불러오는 중입니다...</div>
          </div>
        </div>) : 
        (<React.Fragment>
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
        </React.Fragment>
        )}
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
      const [menuMessage, setMenuMessage] = useState('');

      const handleMenuItemClick = (menuItem) => {
        let message = '';
        // Set the appropriate message based on the clicked menu item
        switch (menuItem) {
          case 'Setting':
            message = '환경설정에 대한 메뉴입니다.';
            break;
          case 'Notice':
            message = '공지사항에 대한 메뉴입니다.';
            break;
          case 'Info':
            message = `
             개발하면서 기초를 철저히 하는것이 중요하다는걸 느꼈습니다.
            그리고 코드가 아닌 API 통신서버가 문제된다던지, 
             모바일기기마다 다르게 UI가 보여서 특정기기에서는 깨져서 보일 수 있다던지하는 보이는것 외에도 신경쓸게 참 많다는걸 알게되었습니다. `;
            break;
          case 'Help':
            message = '고객센터에 대한 메뉴입니다.';
            break;
          default:
            break;
        }    
        setMenuMessage(message);
      };

      return (
        
      <div>
        <div className='top-menu-bar'></div>
        <div className='wrap-fixed'><HeaderState/></div>
        <div className='menu-outer'>
  
            <div className='menu-title'>
              <div className='menu-title-head'>심플 미세먼지 알리미</div>
              <div className='menu-title-body'>
                <div className='menu-title-text'>프로그램 버전 : 1.0</div>
                <div className='menu-title-text'>제작일 : 23.07.19</div>
                <div className='menu-title-text'>제작자 : YoHaYo</div>
                <div className='menu-title-text--last'>
                  스터디용으로 만든 전국 미세먼지 정보를 간단히 볼 수 있는 앱 입니다.
                <br/>아직 미흡한 점 양해부탁드려요. 
                </div>
              </div>
            </div>  
  
            <div className='menu-item' onClick={() => handleMenuItemClick('Setting')}>     
              <span className='menu-icon'>
                <span class="material-symbols-rounded">settings</span>
              </span>
              <span className='menu-text'>환경설정</span>
            </div>
  
            <div className='menu-item' onClick={() => handleMenuItemClick('Notice')}>               
              <span className='menu-icon'>
              <span class="material-symbols-rounded">mark_unread_chat_alt</span>
              </span>
              <span className='menu-text'>공지사항</span>
            </div>
  
            <div className='menu-item' onClick={() => handleMenuItemClick('Help')}>              
              <span className='menu-icon'>
                <span class="material-symbols-rounded">help</span>
              </span>
              <span className='menu-text'>고객센터</span>
            </div>
            
            <div className='menu-item' onClick={() => handleMenuItemClick('Info')}>              
              <span className='menu-icon'>
                <span class="material-symbols-rounded">info</span>
              </span>
              <span className='menu-text'>개발후기</span>
            </div>
  
  
            {menuMessage && (
          <div className='menu-message'>
            {menuMessage.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
            )}
        
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
                      
              <span class="material-symbols-rounded">search</span>
              
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