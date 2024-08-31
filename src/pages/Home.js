import React, { useState, useEffect } from 'react';
import './css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl"

const Product = ({ product }) => {
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

    //편의점, 이벤트 뱃지 추가
    return (
        <li className="item">
            <div className="badge-left"><span className='event-classification'>{product.eventClassification}</span></div>
            <div className="badge-right">
            {product.convenienceClassification === 'CU' && (
                <img src={cuImg} alt="CU" className="convenience-img" />
            )}
            {product.convenienceClassification === 'GS25' && (
                <img src={gs25Img} alt="GS25" className="convenience-img" />
            )}
            {product.convenienceClassification === 'Emart24' && (
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
   
const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${URL_VARIABLE}products?page=${0}&size=10`);
            console.log(response);
            const data = Array.isArray(response.data.content) ? response.data.content : [];
            setProducts(data);
        } catch (error) {
            console.error(error);
            setProducts([]);
        }
    }

    return (
        <ul className="item-list">
            {
                products.map(product => (<Product  key={product.productId} product={product} />))
            }
        </ul>
    )
}

export default Home;