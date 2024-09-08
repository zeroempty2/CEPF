import React, { useState, useEffect } from 'react';
import './css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl";

const Product = ({ product }) => {
    const formatPrice = (price) => {
        if (price.includes('원')) {
            return price.replace('원', '');
        }
        return price;
    };
    const formatEventClassification = (eventClassification) => {
        if (eventClassification.includes('1 + 1')){
            return '1+1'
        }
        else if (eventClassification.includes('2 + 1')){
            return '2+1'
        }
        console.log(eventClassification);
        return eventClassification;
       
    }
    const cuImg = '/CU.png';
    const emartImg = '/Emart24.png';
    const gs25Img = '/GS25.png';

    const formattedPrice = formatPrice(product.productPrice);
    const formattedEventClassification = formatEventClassification(product.eventClassification);
    return (
        <li className="item">
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
        </li>
    );
};
   
const Home = ({keyword, selectedStore, selectedEvent}) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const loadMoreData = () => {
        if (page < totalPage - 1) { 
            setPage(prevPage => prevPage + 1);
        }
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
            {products.map(product => (
                <Product key={product.productId} product={product} />
            ))}
        </ul>
    );
};

export default Home;