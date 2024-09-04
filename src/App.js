import React,{useState} from "react";
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
  const [selected, setSelected] = useState(["ALL"]);
  const [eventSelected, setEventSelected] = useState(['전체']);

  const handleSelect = (store) => {
    if (store === "ALL") {
      setSelected(["ALL"]);
    } else {
      if (selected.includes("ALL")) {
        setSelected([]);
      }

      setSelected((prevSelected) => {
        if (prevSelected.includes(store)) {
          return prevSelected.filter((s) => s !== store); 
        } else {
          return [...prevSelected, store]; 
        }
      });
    }
  };

  const handleDeselect = (event, store) => {
    event.stopPropagation(); 
    setSelected((prevSelected) => prevSelected.filter((s) => s !== store));
  };

  const handleEventSelect = (eventType) => {
    setEventSelected((prevSelected) => {
      if (eventType === '전체') {
        return ['전체'];
      } else {
        if (prevSelected.includes('전체')) {
          return [eventType];
        } else {
          return prevSelected.includes(eventType)
            ? prevSelected.filter((e) => e !== eventType)
            : [...prevSelected, eventType];
        }
      }
    });
  };


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
        <div className="store-type">
          {["ALL", "CU", "GS25", "EMART24"].map((store) => (
            <div
              key={store}
              className={`store-type-icon ${selected.includes(store) ? 'selected' : ''}`}
              onClick={() => handleSelect(store)}
              style={{ position: 'relative' }}
            >
              <img
                src={
                  store === "ALL" ? allIcon :
                  store === "CU" ? cuIcon :
                  store === "GS25" ? gs25Icon : emart24Icon
                }
                alt={store}
                className="store-type-img"
              />
              <span>{store}</span>
              {selected.includes(store) && store !== "ALL" && (
                <button className="close-btn" onClick={(e) => handleDeselect(e, store)}>X</button>
              )}
            </div>
          ))}
        </div>
      <div className="event-type">
        {['전체', '1+1', '2+1', '세일', '덤증정'].map((eventType) => (
          <div
            key={eventType}
            className={`event-type-tab ${eventSelected.includes(eventType) ? 'selected' : ''}`}
            onClick={() => handleEventSelect(eventType)}
          >
            <span>{eventType}</span>
          </div>
        ))}
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
