// const BottomNavigationBar = () => {
//   const [activeScreen, setActiveScreen] = useState('HomeScreen');
//   const [isClicked, setIsClicked] = useState(false);
//   const handleScreenChange = (screen) => {
//     setActiveScreen(screen);
//     setIsClicked(true);
    
//   };

//   return (
//     <div className='inner'>
//       <div className="bottom-nav">
//         <div className='bottom-nav-items'>
//           <span
//             className={`nav-item ${activeScreen === 'SearchScreen' ? 'active' : ''}`}
//             onClick={() => handleScreenChange('SearchScreen')}
//           >
//             <div className='nav-items-icon'>              
//             <span class="material-symbols-rounded">search</span>
//             </div>
//             <span className='nav-items-text'>지역 검색</span>
//           </span>

//           <span
//             className={`nav-item ${activeScreen === 'HomeScreen' ? 'active' : ''}`}
//             onClick={() => handleScreenChange('HomeScreen')}
//           >
//             <div className='nav-items-icon'>
//             <span class="material-symbols-rounded">home</span>
//               </div>
//             <span className='nav-items-text'>전체 지역보기</span>
//           </span>

//           <span
//           className={`nav-item ${activeScreen === 'BookmarkScreen' ? 'active' : ''}`}
//           onClick={() => handleScreenChange('BookmarkScreen')}
//         >
//             <div className='nav-items-icon'>
//             <span class="material-symbols-rounded">star</span>
//             </div>
//             <span className='nav-items-text'>즐겨찾기</span>
//           </span>
          
//           <span
//             className={`nav-item ${activeScreen === 'MenuScreen' ? 'active' : ''}`}
//             onClick={() => handleScreenChange('MenuScreen')}
//           >
//             <div className='nav-items-icon'>
//             <span class="material-symbols-rounded">menu</span>
//             </div>
//             <span className='nav-items-text'>메뉴</span>
//           </span>
//         </div>
//       </div>
//       {/* 스크린선택 */}
//       <div className="content">
//         {activeScreen === 'SearchScreen' && <SearchScreen />}
//         {activeScreen === 'HomeScreen' && <BaseCard />}
//         {activeScreen === 'BookmarkScreen' && <BookmarkScreen />}
//         {activeScreen === 'MenuScreen' && <MenuScreen />}
//       </div>
//     </div>
//   );
// };