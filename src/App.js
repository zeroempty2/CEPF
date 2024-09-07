import React,{useState,useRef} from "react";
import {Routes,Route,Link,useNavigate,useLocation} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
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
  const [keyword,setKeyword] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null); 

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };
  const handleClickHome = () =>{
    setSelected(["ALL"]);
    setEventSelected(["전체"]);
    navigate("/");
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleSelect = (store) => {
    if (store === "ALL") {
      setSelected(["ALL"]);
      setKeyword(inputValue);
    } else {
      if (selected.includes("ALL")) {
        setSelected([]);
        setKeyword(inputValue);
      }

      setSelected((prevSelected) => {
        if (prevSelected.includes(store)) {
          setKeyword(inputValue);
          return prevSelected.filter((s) => s !== store); 
        } else {
          setKeyword(inputValue);
          return [...prevSelected, store]; 
        }
      });
    }
  };

  const handleDeselect = (event, store) => {
    event.stopPropagation(); 
    setSelected((prevSelected) => prevSelected.filter((s) => s !== store));
    setKeyword(inputValue);
  };

  const handleEventSelect = (eventType) => {
    setEventSelected((prevSelected) => {
      if (eventType === '전체') {
        setKeyword(inputValue);
        return ['전체'];
      } else {
        if (prevSelected.includes('전체')) {
          setKeyword(inputValue);
          return [eventType];
        } else {
          setKeyword(inputValue);
          return prevSelected.includes(eventType)
            ? prevSelected.filter((e) => e !== eventType)
            : [...prevSelected, eventType];
        }
      }
    });
  };


  return (
    <div className={`App ${location.pathname === '/signup' || location.pathname === '/login' ? 'no-style' : ''}`}>
           {location.pathname === '/' && (
        <>
          <div className="search-bar">
            <div className="search-bar-logo" onClick={handleClickHome}>
              <span>편</span>
            </div>
            <input
              className='search-bar-text-input'
              type="text"
              placeholder="검색어를 입력하세요"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <div className="submit-search" onClick={handleSearch}>
              <img src={searchIcon2} alt="submit-search" className="submit-search-img" />
            </div>
          </div>

          <div className="wrapper">
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
        </>
      )}

      {location.pathname === '/' && (
        <div className="under-bar">
          <div className="under-bar-icon" onClick={handleClickHome}> 
            <img src={homeIcon} alt="home" className="under-bar-img" />
          </div>
          <div className="under-bar-icon">
            <img src={favoriteIcon} alt="favorite" className="under-bar-img" />
          </div>
          <div className="under-bar-icon" onClick={focusInput}>
            <img src={searchIcon} alt="search" className="under-bar-img" />
          </div>
          <div className="under-bar-icon" onClick={() => navigate("/login")}>
            <img src={userIcon} alt="user" className="under-bar-img" />
          </div>
        </div>
      )}
    <Routes>
      <Route path="/" element={<Home keyword={keyword} selectedStore={selected} selectedEvent={eventSelected} />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </div>
  );
}

export default App;
