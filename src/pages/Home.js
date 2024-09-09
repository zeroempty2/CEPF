import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl";

const Product = ({ product, isLogedIn, favoriteData }) => {
    const formatPrice = (price) => {
        if (price.includes('원')) {
            return price.replace('원', '');
        }
        return price;
    };


    const cuImg = '/CU.png';
    const emartImg = '/Emart24.png';
    const gs25Img = '/GS25.png';
    const star = '/star-gray.png';
    const starFull = '/star-full.png';

    const formattedPrice = formatPrice(product.productPrice);
    const formattedEventClassification = product.eventClassification;
    const [isFavorite,setIsFavorite] = useState(false);

    const navigate = useNavigate();

    const checkIfFav = (product, favoriteData) => {
        const favoriteInfo = favoriteData.get(product.productName);
        if (favoriteInfo &&
            favoriteInfo.convenienceClassification === product.convenienceClassification &&
            favoriteInfo.eventClassification === product.eventClassification) {
            setIsFavorite(true);
        }
    }

    const requestFavorite = async () =>{
        try{
            if(localStorage.getItem('jwtToken') === null) return;
    
            const response = await axios.post(`${URL_VARIABLE}favorite/request`,{
                productName: product.productName,
                productImg: product.productImg,
                convenienceClassification : product.convenienceClassification,
                eventClassification: product.eventClassification
            } ,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
        }   
        catch(error){
            console.error(error);
            localStorage.removeItem('jwtToken');
            navigate("/");
        }
    }


    const addFavorite = () =>{
        try{
            requestFavorite();
            setIsFavorite(true);   
        }
        catch (error){
            console.error(error);
        }
    }

    const deleteFavorite = () =>{
        try{
            requestFavorite();
            setIsFavorite(false);
        }
        catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        checkIfFav(product,favoriteData);
    },[]);

    return (
        <li className={`item ${isFavorite ? 'favorite' : ''}`}>
            <div className={`badge-left ${formattedEventClassification.includes('1+1') ? 'one' : ''} 
                    ${formattedEventClassification.includes('2+1') ? 'two' : ''} 
                    ${formattedEventClassification.includes('세일') ? 'sale' : ''} 
                    ${formattedEventClassification.includes('덤증정') ? 'dum' : ''}`}>
                <span className='event-classification'>
                    {formattedEventClassification}
                </span>
            </div>
            <div className="badge-right">
                {product.convenienceClassification === 'CU' && (
                    <img src={cuImg} alt="CU" className="convenience-img" />
                )}
                {product.convenienceClassification === 'GS25' && (
                    <img src={gs25Img} alt="GS25" className="convenience-img" />
                )}
                {product.convenienceClassification === 'EMART24' && (
                    <img src={emartImg} alt="Emart24" className="convenience-img" />
                )}
            </div>
            <div className='product-img'>   
                <img src={product.productImg} alt="" />
            </div>
            <div className='product-name'>{product.productName}</div>
            <div className='product-price'>
                <span className="bold">{formattedPrice}</span><span>원</span>
            </div>
            {isLogedIn && !isFavorite &&
                <div className='add-favorite' onClick={addFavorite}>
                </div>
            }
              {isLogedIn && isFavorite &&
                <div className='delete-favorite' onClick={deleteFavorite}>
                </div>
            }
        
        </li>
    );
};
   
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
            console.error(error);
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
    <Product key={`${product.productId}-${index}`} product={product} isLogedIn={isLogedIn} favoriteData={favoriteData} />
))}
        </ul>
    );
};

export default Home;