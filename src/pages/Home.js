import React, { useState, useEffect } from 'react';
import './css/Home.css';
import axios from 'axios';

import { URL_VARIABLE } from "./export/ExportUrl"

const Product = ({ product }) => {  
    return(
        <li className="item">
            <img src={product.productImg} alt="" />
        </li>
    )
}

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${URL_VARIABLE}products?page=${0}&size=10`);
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