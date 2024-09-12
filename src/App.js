import React,{useState,useRef} from "react";
import {Routes,Route,Link,useNavigate,useLocation} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import UserInfo from "./pages/UserInfo"
import Favorite from "./pages/Favorite";
import Update from "./pages/Update"
import RouteControll from './pages/export/RouteControll';
import './App.css';


function App() {
  const homeIcon = '/home-select.png'
  const homeEmptyIcon = '/home-non-select.png'
  const searchIcon = '/search.png'
  const favoriteIcon = '/star.png'
  const favoriteFullIcon = '/star-black.png'
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
    setInputValue('');
    setKeyword('');
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
    setSelected((prevSelected) => {
      const updatedSelected = prevSelected.filter((s) => s !== store);
  
      if (updatedSelected.length === 0) {
        return ["ALL"];
      }
  
      return updatedSelected;
    });

    setKeyword(inputValue);
  };

  const handleEventSelect = (eventType) => {
    setEventSelected((prevSelected) => {
      let updatedSelected;
  
      if (eventType === '전체') {
        updatedSelected = ['전체'];
      } 
      else {
        if (prevSelected.includes('전체')) {
          updatedSelected = [eventType];
        } 
        else {
          updatedSelected = prevSelected.includes(eventType)
            ? prevSelected.filter((e) => e !== eventType)
            : [...prevSelected, eventType];
        }
      }

      if (updatedSelected.length === 0) {
        updatedSelected = ['전체'];
      }
  
      setKeyword(inputValue);
      return updatedSelected;
    });
  };

  const navigateIfLogin = () => {
    if(localStorage.getItem('jwtToken')) navigate("/userInfo");
    else navigate("/login")
  }

  const navigateFavorite = () => {
    if(localStorage.getItem('jwtToken')) navigate("/favorite");
    else navigate("/login");
  }

  return (
    <div className={`App ${location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/userInfo' ? 'no-style' : ''}`}>
           {(location.pathname === '/' || location.pathname === '/favorite') && (
        <>

            <div className="search-bar">
            <div className="search-bar-logo" onClick={handleClickHome}>
              <span>편</span>
            </div>
            <input
              className='search-bar-text-input'
              type="text"
              placeholder={location.pathname === '/' ? "검색어를 입력하세요" : "즐겨찾기에서 검색"}
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
          <div className="under-bar-icon" onClick={navigateFavorite}>
            <img src={favoriteIcon} alt="favorite" className="under-bar-img" />
          </div>
          <div className="under-bar-icon" onClick={focusInput}>
            <img src={searchIcon} alt="search" className="under-bar-img" />
          </div>
          <div className="under-bar-icon" onClick={navigateIfLogin}>
            <img src={userIcon} alt="user" className="under-bar-img" />
          </div>
        </div>
      )}
      {location.pathname === '/favorite' && (
             <div className="under-bar">
             <div className="under-bar-icon" onClick={handleClickHome}> 
               <img src={homeEmptyIcon} alt="home" className="under-bar-img" />
             </div>
             <div className="under-bar-icon" onClick={navigateFavorite}>
               <img src={favoriteFullIcon} alt="favorite" className="under-bar-img" />
             </div>
             <div className="under-bar-icon" onClick={focusInput}>
               <img src={searchIcon} alt="search" className="under-bar-img" />
             </div>
             <div className="under-bar-icon" onClick={navigateIfLogin}>
               <img src={userIcon} alt="user" className="under-bar-img" />
             </div>
           </div>
      )}
   <Routes>
      <Route path="/" element={<RouteControll> <Home keyword={keyword} selectedStore={selected} selectedEvent={eventSelected} /> </RouteControll>}/>
      <Route path="/signup"  element={<RouteControll> <SignUp /> </RouteControll>} />
      <Route path="/login" element={<RouteControll> <Login /> </RouteControll>}/>
      <Route path="/update" element={<Update />} />
      <Route path="/userInfo" element={<RouteControll> <UserInfo /> </RouteControll>}/>
      <Route path="/favorite" element={<RouteControll> <Favorite keyword={keyword} selectedStore={selected} selectedEvent={eventSelected} /> </RouteControll>}/>
    </Routes>
    </div>
  );
}

export default App;
