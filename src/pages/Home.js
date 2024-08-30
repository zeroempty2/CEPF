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

    const formattedPrice = formatPrice(product.productPrice);

    return (
        <li className="item">
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