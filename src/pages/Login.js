import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './css/Login.css';
import { URL_VARIABLE } from "./export/ExportUrl";

const Login = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
          ...userData,
          [name]: value
        });
      };

      const handleLoginClcik = async() => {
        try {
            const response = await axios.post( URL_VARIABLE + 'users/login', userData);
            if(response.data.statusCode === 200){
              const token = response.headers['authorization'];
              localStorage.setItem('jwtToken', token);
              alert("로그인 성공");
              navigate("/");
            }else{
              alert("아이디와 비밀번호를 다시 확인 해 주세요")
            }
          }
           catch (error) {
            alert("아이디와 비밀번호를 다시 확인해 주세요");
            
          }
      };

    return(
        <div>
            <div className='login-box'>
                <div className="login-bar">
                    <span>로그인</span>
                </div>
                <div className='login-info'>

                <div className='login-info-input-username'>
                        <div className='login-info-input'>
                            <span className='login-id'>아이디 </span> 
                            <input
                                className='login-text-input'
                                type="text"
                                placeholder="아이디 입력"
                                name='username'
                                value={userData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                   
                </div>

                    <div className='login-info-input-password'>
                        <div className='login-info-input'>
                            <span className='login-password'>비밀번호</span>
                            <input
                                className='login-text-input'
                                type="password"
                                name='password'
                                placeholder="비밀번호 입력"
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                  
                </div>
                <div className='login-button-container'>
                    <button className='login-button' onClick={() => navigate(-1)}>뒤로가기</button>
                    <button className='login-button' onClick={handleLoginClcik}>로그인</button>
                </div>
                <div className='signup-text' onClick={() => navigate("/signup")}>회원가입</div>
            </div>

            
           
        </div>
    );
};
export default Login;