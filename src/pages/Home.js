import React, { useState, useEffect , useRef} from 'react';
import {useNavigate} from "react-router-dom";
import './css/Home.css';
import axios from 'axios';
import throttle from 'lodash/throttle'; 

import Product from './export/Product';
import { URL_VARIABLE } from "./export/ExportUrl";
   
    const Home = ({keyword, selectedStore, selectedEvent}) => {
        const navigate = useNavigate();
        const loaderRef = useRef(null); 
        
        const [products, setProducts] = useState([]);
        const [page, setPage] = useState(0);
        const [totalPage, setTotalPage] = useState(0);
        const [isLogedIn,setIsLogedIn] = useState(false);
        const [favoriteData, setFavoriteData] =  useState(() => {
            const map = new Map();
            return map;
        });
        const [isLoadingFavorite, setIsLoadingFavorite] = useState(true);

        const loadMoreData = () => {
            if (page < totalPage - 1) {
                setPage(prevPage => prevPage + 1);
            }
        };
        const handleMoveStart = () => {
            window.scrollTo({
              top: 0, 
              behavior: 'smooth' 
            });
          };
        
      
          const handleMoveEnd = () => {
            const scrollHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;
            window.scrollTo({
              top: scrollHeight - windowHeight - 100, // 최하단보다  위로 이동
              behavior: 'smooth' 
            });
          };

        const fetchFavorite = async () => {
            try {
                if (localStorage.getItem('jwtToken') === null) return;
                const response = await axios.get(`${URL_VARIABLE}favorite?page=0&size=100`, {
                    headers: {
                        Authorization: `${localStorage.getItem('jwtToken')}`
                    }
                });
                updateFavoriteData(response.data.content);
                setIsLogedIn(true);
                setIsLoadingFavorite(false); 
            } catch (error) {
                alert("다시 로그인 해 주세요");
                localStorage.removeItem('jwtToken');
                navigate("/");
            }
        };

        const updateFavoriteData = (response) => {
            setFavoriteData(prevMap => {
            const newMap = new Map(prevMap);
        
            response.forEach(item => {
                const { productName, convenienceClassification, eventClassification } = item;
                newMap.set(productName, { convenienceClassification, eventClassification });
            });
        
            return newMap;
            });
        };

        
        const fetchProducts = async () => {
            try {
                const response = await axios.post(
                    `${URL_VARIABLE}products?page=${page}&size=10`,
                    {
                        keyword: keyword,
                        convenienceClassifications: selectedStore.includes("ALL") ? [] : selectedStore,
                        eventClassifications: selectedEvent.includes("전체") ? [] : selectedEvent
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const data = Array.isArray(response.data.content) ? response.data.content : [];
                setProducts(prevProducts => [...prevProducts, ...data]);
                setTotalPage(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        useEffect(() => {
            const initializePage = async () => {
                setIsLoadingFavorite(true);
                await fetchFavorite(); 
                setProducts([]);
                setPage(0);
                fetchProducts(0);
            };
            initializePage();
        }, [keyword, selectedStore, selectedEvent]);

        useEffect(() => {
            if (page > 0) {
                fetchProducts(page);
            }
        }, [page]);

        useEffect(() => {
            const handleScroll = throttle(() => {
                if (loaderRef.current) {
                    const loaderPosition = loaderRef.current.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    if (loaderPosition <= windowHeight && page < totalPage - 1) {
                        loadMoreData();
                    }
                }
            }, 500); // 스크롤 페이지 로딩시 500ms 텀
        
            window.addEventListener('scroll', handleScroll, { passive: true });
        
            return () => window.removeEventListener('scroll', handleScroll);
        }, [page, totalPage]); 
        
        if (isLogedIn && isLoadingFavorite) {
            return <div>Loading...</div>; 
        }

    return (
        <ul className="item-list">
          {products.map((product, index) => (
     <Product key={`${product.productId}-${index}`} product={product} isLogedIn={isLogedIn} favoriteData={favoriteData} fetchProducts={{}} isFavoritePage={false}/>
))}
        <div className="button_group">
            <button className="move_start" onClick={handleMoveStart}>▲</button>
            <button className="move_end" onClick={handleMoveEnd}>▼</button>
        </div>
 <div className='loader' ref={loaderRef}></div>
        </ul>
    );
};

export default Home;