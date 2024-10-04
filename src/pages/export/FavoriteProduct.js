import React, { useState, useEffect } from 'react';
import {useNavigate,useLocation} from "react-router-dom";
import '../css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./ExportUrl";



const FavoriteProduct = ({ product, isLogedIn, fetchProducts, isFavoritePage,activeTab}) => {
    const cuImg = '/CU.png';
    const emartImg = '/Emart24.png';
    const gs25Img = '/GS25.png';

    const formattedEventClassification = product.eventClassification;
    const [isFavorite,setIsFavorite] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const [isDum,setIsDum] = useState(false);
    const [dumOpen,setDumOpen] = useState(false);
    const [formattedPrice,setFormattedPrice] = useState('가격정보 없음');
    const [nonPrice,setNonPrice] = useState(false);
    const [loading, setLoading] = useState(true);

    const formatPrice = async(price) => {
        if (!price) {
            setNonPrice(true); 
        } 
        else if (price.includes('원')) {
            setNonPrice(false);
            setFormattedPrice(price.replace('원', ''));
        } 
        else if (price.includes('가격정보 없음')) {
            setNonPrice(true);
        }
        else{
            setNonPrice(false);
            setFormattedPrice(price);
        }
    };

    const checkIsdum = async(product) => {
        if(product.eventClassification.includes("덤")){
            setIsDum(true);
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

    const deleteFavorite = async () => {
        try {
            await requestFavorite();
            setIsFavorite(false);
            if(isFavoritePage){
                fetchProducts(); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDumButton = () =>{
        dumOpen ? setDumOpen(false) : setDumOpen(true);
    }

    // useEffect(() => {
    //     checkIsdum(product);
    //     checkIfFav(product,favoriteData);
    //     formatPrice(product.productPrice);
    // },[product]);

    useEffect(() => {
        const fetchProductData = async () => {
            if (!product) return;
            try {
               setIsDum(false);  // tab 변경 시 isDum 초기화
               await checkIsdum(product);
               await formatPrice(product.productPrice);
               setLoading(false);  // 데이터 처리 완료 후 loading 상태를 false로 설정
            } catch (error) {
                console.error('Error loading product data:', error);
                setLoading(false);  // 에러가 발생해도 loading 상태 해제
            }
        };
    
        fetchProductData();
    }, [product, activeTab]);

    if (loading) {
        return <div>Loading...</div>;  // 로딩 중일 때는 로딩 메시지를 표시
    }


    return (
        <li className={`item ${(isFavorite || isFavoritePage)? 'favorite' : ''}`}>
                     {isDum && 
                <div className = 'show-dum' onClick={handleDumButton}>
                    <span>
                      click!
                    </span>
                </div>
            }
              {(location.pathname === '/favorite' && !product.isSale) &&(
                    <div className="overlay">
                    행사 중이 아닙니다
                </div>
              )} 

              {!dumOpen && (
                <>
            <div className={`badge-left ${formattedEventClassification.includes('1+1') ? 'one' : ''}${formattedEventClassification.includes('2+1') ? 'two' : ''}${formattedEventClassification.includes('세일') ? 'sale' : ''}${formattedEventClassification.includes('덤증정') ? 'dum' : ''}`}>
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
            {isDum && (
                 <div className='product-img' onClick={handleDumButton}>   
                 <img src={product.productImg} alt="" />
             </div>
            )}
               {!isDum && (
                 <div className='product-img' >   
                 <img src={product.productImg} alt="" />
             </div>
            )}
            <div className='product-name'>{product.productName}</div>
            {nonPrice &&  
                <div className='product-price'>
                    <span className="bold">가격정보 없음</span>
                </div>
            }
            {!nonPrice &&  
                <div className='product-price'>      
                    <span className="bold">{formattedPrice}</span><span>원</span>
                </div>
            }
           
                </>
              )}
            {dumOpen && (
                <>
                <div className='product-img'  onClick={handleDumButton}>   
                    {product.dumImg !== "" ? <img src={product.dumImg} alt="" /> : <span>이미지가 없습니다.</span>}
                </div>
                {product.dumName !== "" && (
                       <div className='product-name'>{product.dumName }</div>
                )
                }
                <div className = 'close-dum' onClick={handleDumButton}>
                    <span>
           
                    </span>
                </div>
                </>
            )}
            {((isLogedIn && !isFavorite) || isFavoritePage) &&
                <div className='add-favorite' onClick={addFavorite}>
                </div>
            }
            {((isLogedIn && isFavorite) || isFavoritePage)&&
            <div className='delete-favorite' onClick={deleteFavorite}>
            </div>
            }
        
        </li>
    );
};

export default FavoriteProduct;