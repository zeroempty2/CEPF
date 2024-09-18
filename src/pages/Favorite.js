import React,{useState,useRef, useEffect} from "react";
import {Routes,Route,Link,useNavigate,useLocation} from "react-router-dom";
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl";
import './css/Favorite.css';
import Product from './export/Product';

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
      console.log(pageRange);
      if(pageRange[1] + 5 > totalPages - 1){
        setPageRange([pageRange[1] + 1, totalPages - 1]);

        }else{
          setPageRange([pageRange[0] + 5 , pageRange[0] + 9])
        }
    };
  
    const handlePrevClick = () => {
      if(5 % (pageRange[1] - 1) <= 5){
        setPageRange([0 , 4]);
        return;
        }
      if((5 % (pageRange[1] - 1) === 5)){
        setPageRange([pageRange[1] - 5, pageRange[1] - 1]);
      }
    };

    const handlefirstClick = () => {
        setPageRange([0,4]);
    }

    const handleEndClick = () => {
        setPageRange([totalPages - (totalPages % 5), totalPages - 1]);
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
          <button onClick={handlePrevClick}>{'<'}</button>
          </div>
        )}    

        <div className= "pagination-button">
          {renderPageNumbers()}
        </div>
       

        {pageRange[1] < totalPages - 1 && (
          <div className="right-button">
            <button onClick={handleNextClick}>{'>'}</button>
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
 
            const response = await axios.post(`${URL_VARIABLE}favorite/check?page=${page}&size=4`,{
              keyword: keyword,
              convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
              eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent,
              inProgress: activeTab
            } ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            setProduct(response.data.content);
            setTotalPage(response.data.totalPages);
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
        fetchFavorite(page);
    }, [page]);


    useEffect(() => {
      fetchFavorite();
      setPage(0);
  }, [keyword, selectedStore, selectedEvent,activeTab]);

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
        <div className="favorite-list">
          {product.length === 0 ? (
            <div className="favorite-non">즐겨찾기된 상품이 없습니다.</div>
          ) : (
            product.map((item) => (
              <Product key={item.productId} product={item} isLogedIn={true} favoriteData={{}} fetchProducts={fetchFavorite} isFavoritePage={true}/>
            ))
          )}
        </div>
        {product.length !== 0 && (
          <Pagination totalPages={totalPage} currentPage={page} onPageChange={handlePageChange} />
        )}

        </>

      );
      
}
export default Favorite;