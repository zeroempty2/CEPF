import React,{useEffect}from 'react';
import { Route, useNavigate } from 'react-router-dom';
import './css/Update.css';


const Update = () =>{
    const navigate = useNavigate();

    useEffect(() => {
      const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
      const currentDate = new Date(currentTime);
  
      const startTime = new Date(currentDate);
      startTime.setHours(0, 0, 0); 
      const endTime = new Date(currentDate);
      endTime.setHours(1, 0, 0);
  
      if (currentDate < startTime || currentDate > endTime) {
        navigate("/");
      } 
    }, []);

return (
    <div className='update'>
        <span className='update-word'> 데이터 업데이트 중입니다 </span>
       <span className='update-time'>  KST 00:00 - 01:00</span>
    </div>

);
};
export default Update;