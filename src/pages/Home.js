import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './css/Home.css';
import axios from 'axios';

import Product from './export/Product';
import { URL_VARIABLE } from "./export/ExportUrl";
   
const Home = ({keyword, selectedStore, selectedEvent}) => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLogedIn,setIsLogedIn] = useState(false);
    const [favoriteData, setFavoriteData] =  useState(() => {
        const map = new Map();
        return map;
      });

    const loadMoreData = () => {
        if (page < totalPage - 1) { 
            setPage(prevPage => prevPage + 1);
        }
    };

    const fetchFavorite = async () =>{
        try{
            if(localStorage.getItem('jwtToken') === null) return;
            //페이지 임시
            const response = await axios.get(`${URL_VARIABLE}favorite?page=0&size=100` ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            //   if(response.data.status !== 200){
            //     alert("다시 로그인 해 주세요");
            //     localStorage.removeItem('jwtToken');
            //     navigate("/");
            //     return;
            //   }
            updateFavoriteData(response.data.content)
            setIsLogedIn(true);
            
        }   
        catch(error){
            alert("다시 로그인 해 주세요");
            localStorage.removeItem('jwtToken');
            navigate("/");
        }
    }

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
        fetchFavorite();
        setProducts([]);
        setPage(0);
        fetchProducts(0);
    }, [keyword, selectedStore, selectedEvent]);

    useEffect(() => {
        if (page > 0) {
            fetchProducts(page);
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
                loadMoreData();
            }
        };
    
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, totalPage]);

    return (
        <ul className="item-list">
          {products.map((product, index) => (
     <Product key={`${product.productId}-${index}`} product={product} isLogedIn={isLogedIn} favoriteData={favoriteData} fetchProducts={{}} isFavoritePage={false}/>
))}
        </ul>
    );
};

export default Home;