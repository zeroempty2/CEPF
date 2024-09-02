import React from "react";
import {Routes,Route,Link} from "react-router-dom";
import Home from "./pages/Home";
import './App.css';


//검색 api추가
//로그인, 회원관련 api추가
function App() {
  const homeIcon = '/home.png'
  const searchIcon = '/search.png'
  const favoriteIcon = '/star.png'
  const userIcon = '/user.png'
  const allIcon = '/All.png'
  const cuIcon = '/CU.png'
  const emart24Icon = '/Emart24.png'
  const gs25Icon = '/GS25.png'  
  const searchIcon2 = '/search2.png'

  return (
    <div className="App">
      <div className = "search-bar">
        <div className="search-bar-logo">
          <span>편</span>
        </div>
        
                <input
                  className='search-bar-text-input'
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
                <div className="submit-search">
                  <img src={searchIcon2} alt="submit-search" className="submit-search-img" />
                </div>
      </div>
      <div className = "wrapper">
      <div className = "store-type">
        <div className="store-type-icon">
            <img src={allIcon} alt="all" className="store-type-img" />
            <span>전체</span>
        </div>
        <div className="store-type-icon">
            <img src={cuIcon} alt="cu" className="store-type-img" />
            <span>CU</span>
        </div>
        <div className="store-type-icon">
            <img src={gs25Icon} alt="gs25" className="store-type-img" />
            <span>GS25</span>
        </div>
        <div className="store-type-icon">
            <img src={emart24Icon} alt="emart24" className="store-type-img" />
            <span>EMART24</span>
        </div>
      </div>

      <div className = "event-type">
        <div className = "event-type-tab">
          <span>전체</span>
        </div>
        <div className = "event-type-tab">
          <span>1+1</span>
        </div>
        <div className = "event-type-tab">
          <span>2+1</span>
        </div>
        <div className = "event-type-tab">
          <span>세일</span>
        </div>
        <div className = "event-type-tab">
          <span>덤증정</span>
        </div>
      </div>
    </div>

    <div className="under-bar">
      <div className="under-bar-icon">
        <img src={homeIcon} alt="home" className="under-bar-img" />
      </div>
      <div className="under-bar-icon">
      <img src={favoriteIcon} alt="favorite" className="under-bar-img" />
      </div>
      <div className="under-bar-icon">
      <img src={searchIcon} alt="search" className="under-bar-img" />
      </div>
      <div className="under-bar-icon">
      <img src={userIcon} alt="user" className="under-bar-img" />
      </div>
  </div>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
