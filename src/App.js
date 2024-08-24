import React from "react";
import {Routes,Route,Link} from "react-router-dom";
import Home from "./pages/Home";
import './App.css';

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


    </div>

    <div className="under-bar">

  </div>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;

//Routes 안에 어떤 컴포넌트를 정의해서 보여줄지 결정할 수 있음
// Link -> Route -> element 
// <Link to = "/"> 는 <a href = "/" > 와 같음