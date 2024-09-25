import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './css/Admin.css';
import { URL_VARIABLE } from "./export/ExportUrl";

const Admin = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState({
        CU: false,
        GS25: false,
        EMART24: false,
      });
    
      const handleDeleteProdCrawl = (store) => {
        if (window.confirm(`${store} 정보를 삭제하시겠습니까?`)) {
          deleteProdCrawl(store);
        }
      };
    
      const handleRequestProdCrawl = (store) => {
        if (window.confirm(`${store} 크롤링을 요청하시겠습니까?`)) {
          requestprodCrawl(store); 
          setIsDisabled((prevState) => ({
            ...prevState,
            CU:true,
            GS25:true,
            EMART24:true,
          }));
    
          // 25분 후 버튼 활성화
          setTimeout(() => {
            setIsDisabled({
              CU: false,
              GS25: false,
              EMART24: false,
            });
          }, 25 * 60 * 1000); // 25분(1500초)
        }
      };
    
    useEffect(() => {
        requestTest();
      }, []); 

    const requestApiBlock = async() => {
        try {
            const response = await axios.post( URL_VARIABLE + 'admin/block', {},{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            if(response.data.statusCode === 200){
              alert("성공");

            }else{
              alert("에러");

            }
          }
           catch (error) {
            alert("에러");

            
          }
      };

      const requestTest = async() => {
        try {
            const response = await axios.post( URL_VARIABLE + 'admin/allow',{}, {
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });

            if(!response.data.statusCode === 200){
                navigate('/'); 
                }
            }
             catch (error) {
              navigate('/'); 
            }
      };

      const requestApiAllow = async() => {
        try {
            const response = await axios.post( URL_VARIABLE + 'admin/allow',{}, {
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });

            if(response.data.statusCode === 200){
              alert("성공");
            }else{
                alert("에러")

              }
            }
             catch (error) {
              alert("에러");

            }
      };

      const requestprodCrawl = async(convenienceClassification) => {
        try {
            const response = await axios.post( URL_VARIABLE + `admin/crawl?convenienceClassification=${convenienceClassification}`,{}, {
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            if(response.data.statusCode === 200){
              alert("성공");
            }else{
              alert("에러")

            }
          }
           catch (error) {
            alert("에러");

          }
      };

      const deleteProdCrawl = async(convenienceClassification) => {
        try {
            const response = await axios.delete( URL_VARIABLE + `admin/delete?convenienceClassification=${convenienceClassification}`,{
                headers: {
                  Authorization: `${localStorage.getItem('jwtToken')}`
                }
              });
            if(response.data.statusCode === 200){
              alert("성공");
            }else{
              alert("에러")

            }
          }
           catch (error) {
            alert("에러");

          }
      };

    return(
        <div className='request_button_group'>
        <button className='request_button' onClick={() => requestApiAllow()}>Allow</button>
        <button className='request_button' onClick={() => requestApiBlock()}>Block</button>
        
        <button 
          className='request_button' 
          onClick={() => handleRequestProdCrawl('CU')} 
          disabled={isDisabled.CU || isDisabled.GS25 || isDisabled.EMART24}
        >
            CU크롤
        </button>
        
        <button 
          className='request_button' 
          onClick={() => handleRequestProdCrawl('GS25')} 
          disabled={isDisabled.CU || isDisabled.GS25 || isDisabled.EMART24}
        >
          Gs25크롤
        </button>
        
        <button 
          className='request_button' 
          onClick={() => handleRequestProdCrawl('EMART24')} 
          disabled={isDisabled.CU || isDisabled.GS25 || isDisabled.EMART24}
        >
          EMART24크롤
        </button>
        
        <button 
          className='request_button' 
          onClick={() => handleDeleteProdCrawl('CU')}
        >
          CU삭제
        </button>
        
        <button 
          className='request_button' 
          onClick={() => handleDeleteProdCrawl('GS25')}
        >
          GS25삭제
        </button>
        
        <button 
          className='request_button' 
          onClick={() => handleDeleteProdCrawl('EMART24')}
        >
          EMART24삭제
        </button>
      </div>
    );
};
export default Admin;