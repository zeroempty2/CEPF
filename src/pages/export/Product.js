import React, { useState, useEffect } from 'react';
import {useNavigate,useLocation} from "react-router-dom";
import '../css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./ExportUrl";



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

    const formattedPrice = formatPrice(product.productPrice);
    const formattedEventClassification = product.eventClassification;
    const [isFavorite,setIsFavorite] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    
    const checkIfFav = (product, favoriteData) => {
        if(location.pathname === '/favorite'){
            setIsFavorite(true);
            return;
        }
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

export default Product;