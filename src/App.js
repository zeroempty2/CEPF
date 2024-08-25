import React from "react";
import {Routes,Route,Link} from "react-router-dom";
import Home from "./pages/Home";
import './App.css';


//검색 api추가
//로그인, 회원관련 api추가
function App() {
  return (
    <div className="App">
      <div className = "search-bar">
        <p>CEP</p>
                <input
                  className='comment-text-input'
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
                <button type="submit" className='comment-submit-button'>검색</button>
      </div>
      <div className = "wrapper">
      <div className = "store-type">
      <p>전체아이콘|</p><p>cu아이콘|</p><p>gs아이콘|</p><p>emart아이콘</p>
      </div>

      <div className = "event-type">
      <p>전체 |</p><p>1+1 |</p><p>2+1 |</p><p>기타(storetype에 따라 변동)</p>
        </div>
    </div>

    <div className="under-bar">
      <p>홈|</p><p>즐겨찾기|</p><p>검색|</p><p>회원</p>
  </div>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
