
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteControll = ({ children }) => {
    const [isAccessible, setIsAccessible] = useState(true);

    useEffect(() => {
      const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
      const currentDate = new Date(currentTime);
  
      const startTime = new Date(currentDate);
      startTime.setHours(0, 0, 0); 
      const endTime = new Date(currentDate);
      endTime.setHours(2, 0, 0);
  
      if (currentDate >= startTime && currentDate <= endTime) {
        setIsAccessible(false); 
      } else {
        setIsAccessible(true);  
      }
    }, []);

    return isAccessible ? children : <Navigate to="/update" />;
};  
    
    export default RouteControll;