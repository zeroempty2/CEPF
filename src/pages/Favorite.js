import React,{useState,useRef, useEffect} from "react";
import {Routes,Route,Link,useNavigate,useLocation} from "react-router-dom";
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl";
import './css/Favorite.css';
import FavoriteProduct from './export/FavoriteProduct';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pageRange, setPageRange] = useState([0, 4]);  

    const handlePageClick = (pageNum) => {
      onPageChange(pageNum);
    };

    useEffect(() => {
      if (totalPages < 5) {
        setPageRange([0, totalPages - 1]); 
      } else {
        setPageRange([0, 4]); 
      }
    }, [totalPages]); 

    const handleNextClick = () => {
      if(pageRange[1] + 5 > totalPages - 1){
        setPageRange([pageRange[1] + 1, totalPages - 1]);

        }else{
          setPageRange([pageRange[0] + 5 , pageRange[0] + 9])
        }
    };
  
    const handlePrevClick = () => {
      if(pageRange[0] - 4 === 1){
        setPageRange([0 , 4]);
        }
      else{
        setPageRange([pageRange[0] - 5, pageRange[0] - 1]);
      }
    };

    const handlefirstClick = () => {
        setPageRange([0,4]);
    }

    const handleEndClick = () => {
      if(totalPages - (totalPages % 5) - 1 ===  totalPages - 1){
        setPageRange([totalPages - 5, totalPages - 1]);
      }
       else{
        setPageRange([totalPages - (totalPages % 5), totalPages - 1]);
       } 
    }
  
    const renderPageNumbers = () => {
      const pages = [];
      for (let i = pageRange[0]; i <= pageRange[1]; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i + 1}
          </button>
        );
      }
      return pages;
    };
  
    return (
      <div className="pagination">

        {pageRange[0] > 0 && (
            <div className="left-button">
          <button onClick={handlefirstClick}>{'<<'}</button>
          <button >{''}</button>
          <button onClick={handlePrevClick}>{'<'}</button>
          </div>
        )}    

        <div className= "pagination-button">
          {renderPageNumbers()}
        </div>
       

        {pageRange[1] < totalPages - 1 && (
          <div className="right-button">
            <button onClick={handleNextClick}>{'>'}</button>
            <button >{''}</button>
            <button onClick={handleEndClick}>{'>>'}</button>
          </div>
        )}
      </div>
    );
  };

const Favorite = ({keyword,selectedStore,selectedEvent}) => {
    const [product,setProduct] = useState([]);
    const [page,setPage] = useState(0);
    const [activeTab, setActiveTab] = useState('전체');
    const [totalPage,setTotalPage] = useState(0);

    const handlePageChange = (pageNum) => {
        setPage(pageNum);
      };

    const handleTabClick = (tabContent) => {
      setActiveTab(tabContent);
    };

    const navigate = useNavigate();

    const fetchFavorite = async() => {
        try{
            if(localStorage.getItem('jwtToken') === null) return;
            if(activeTab === "전체"){
              const response = await axios.post(`${URL_VARIABLE}favorite/all?page=${page}&size=4`,{
                keyword: keyword,
                convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
                eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
                inProgress: activeTab,
                currentPage : page + 1
              } ,{
                  headers: {
                    Authorization: `${localStorage.getItem('jwtToken')}`
                  }
                });
              setProduct(response.data.content);
              setTotalPage(response.data.totalPages);
            }

            else if(activeTab === "행사중"){
              const response = await axios.post(`${URL_VARIABLE}favorite/during?page=${page}&size=4`,{
                keyword: keyword,
                convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
                eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
                inProgress: activeTab,
                currentPage : page + 1
              } ,{
                  headers: {
                    Authorization: `${localStorage.getItem('jwtToken')}`
                  }
                });
              setProduct(response.data.content);
              setTotalPage(response.data.totalPages);
            }

            else{
              const response = await axios.post(`${URL_VARIABLE}favorite/end?page=${page}&size=4`,{
                keyword: keyword,
                convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
                eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
                inProgress: activeTab,
                currentPage : page + 1
              } ,{
                  headers: {
                    Authorization: `${localStorage.getItem('jwtToken')}`
                  }
                });

              setProduct(response.data.content);
              setTotalPage(response.data.totalPages);
            }
        }   
        catch(error){
            console.error(error);
            navigate("/");
        }
    }

    const fetchFavoriteFirstPage = async() => {
      try{
        console.log(activeTab);
          if(localStorage.getItem('jwtToken') === null) return;
          if(activeTab === "전체"){
            const response = await axios.post(`${URL_VARIABLE}favorite/all?page=${0}&size=4`,{
              keyword: keyword,
              convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
              eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
              inProgress: activeTab,
              currentPage : 1
            } ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            setProduct(response.data.content);
            setTotalPage(response.data.totalPages);
          }

          else if(activeTab === "행사중"){
            const response = await axios.post(`${URL_VARIABLE}favorite/during?page=${0}&size=4`,{
              keyword: keyword,
              convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
              eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
              inProgress: activeTab,
              currentPage : 1
            } ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            setProduct(response.data.content);
            setTotalPage(response.data.totalPages);
          }

          else{
            const response = await axios.post(`${URL_VARIABLE}favorite/end?page=${0}&size=4`,{
              keyword: keyword,
              convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
              eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
              inProgress: activeTab,
              currentPage : 1
            } ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            setProduct(response.data.content);
            setTotalPage(response.data.totalPages);
          }
      }   
      catch(error){
          console.error(error);
          navigate("/");
      }
  }

    useEffect(()=>{
        fetchFavorite();
    },[])

    useEffect(() => {
      if(page > 0){
        fetchFavorite(page);
      }
    }, [page]);

  //   useEffect(() => {
  //     setPage(0);  
  // }, [activeTab, keyword, selectedStore, selectedEvent]);

    useEffect(() => {
      setProduct([]);
      setPage(0);
      fetchFavoriteFirstPage();
  }, [keyword, selectedStore, selectedEvent]);

      useEffect(()=>{
        setProduct([]);
        setPage(0);
        fetchFavoriteFirstPage();
    },[activeTab]);

    return (
        <>
        <div className='tab'> 
  
            <div
                className={`tab-content ${activeTab === '전체' ? 'tab-content-active' : ''}`}
                onClick={() => handleTabClick('전체')}
            >
                전체
            </div>
            <div
                className={`tab-content ${activeTab === '행사중' ? 'tab-content-active' : ''}`}
                onClick={() => handleTabClick('행사중')}
            >
                행사중
            </div>
            <div
                className={`tab-content ${activeTab === '행사종료' ? 'tab-content-active' : ''}`}
                onClick={() => handleTabClick('행사종료')}
            >
                행사종료
            </div>

        </div>
        {product.length === 0 ? (
            <div className="favorite-non">즐겨찾기된 상품이 없습니다.</div>
          ) :(<div className="favorite-list">
       { product.map((item) => (
    <FavoriteProduct key={item.productId} product={item} isLogedIn={true} fetchProducts={fetchFavorite} isFavoritePage={true} activeTab = {activeTab}/>
))}
       </div>
      )}
 
        
        {product.length !== 0 && (
                  <Pagination totalPages={totalPage} currentPage={page} onPageChange={handlePageChange} />
                )}
        
        </>

      );
      
}
export default Favorite;