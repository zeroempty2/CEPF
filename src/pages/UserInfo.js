import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './css/UserInfo.css';
import { URL_VARIABLE } from "./export/ExportUrl";

const UserInfo = () => {
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState([]);
    const [isChange,setIsChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        oldPassword:'',
        confirmPassword:''
      });

    const [patternCheck, setPatternCheck] = useState({
        password:null,
    })
    const [confirmedPassword, setConfirmedPassword] = useState(null);

    const fetchUserInfo = async() =>{
        const jwtToken = localStorage.getItem('jwtToken');
        try{
            const response = await axios.get(
                URL_VARIABLE + "users/profile",{
                    headers: {
                      Authorization: `${jwtToken}`
                    }
                  });
                  
          if(response.data.username === null){
            alert("다시 로그인 해 주세요");
            localStorage.removeItem('jwtToken');
            navigate("/");
          }
          
            setUserInfo(response.data);
        }
        catch(error){
            alert("다시 로그인 해 주세요");
            localStorage.removeItem('jwtToken');
            navigate("/");
        }
    }

    const handleLogout = () =>{
        localStorage.removeItem('jwtToken');
        alert("로그아웃 되었습니다.")
        navigate("/");
    };

    const changePassword = () =>{
        setIsChange(true);
    };


    useEffect(() => {
        fetchUserInfo();
    },[]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasswordData({
          ...passwordData,
          [name]: value
        });
      };

      const checkPasswordPattren = () => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,15}$/;

           if(pattern.test(passwordData.newPassword)) {
            setPatternCheck({
            ...patternCheck,
            password:true
        })
    }
        else{
            setPatternCheck({
                ...patternCheck,
                password:false
            })
        
        }
       
    };

    const checkConfirmPassword = () => {
        if(passwordData.newPassword === passwordData.confirmPassword){
            setConfirmedPassword(true);
        }
        else{
            setConfirmedPassword(false);
        }
       
    };

    const handleConfirmPasswordChange = () => {
        if(patternCheck.password === false || patternCheck.password === null){
            alert("입력하신 내용을 다시 확인 해 주세요");
        }
        else if(confirmedPassword === false || confirmedPassword === null){
            alert("입력하신 내용을 다시 확인 해 주세요");
        }
        else{
            requestUpdatePassword();
        }
    }

    const requestUpdatePassword = async() => {
        const jwtToken = localStorage.getItem('jwtToken');
        try{
            const response = await axios.put(
                URL_VARIABLE + "users/update/password", {
                    newPassword: passwordData.newPassword,
                    oldPassword:passwordData.oldPassword,
                }, {
                    headers: {
                      Authorization: `${jwtToken}`
                    }
                  });
                  
      
            const statusCode = response.data.statusCode;

          if(statusCode !== 200){
            alert("입력하신 내용을 다시 확인 해 주세요");
            return;
          }
          alert("비밀번호가 변경되었습니다.");
          localStorage.removeItem('jwtToken');
          navigate("/");
        }
        catch(error){
            alert("입력하신 내용을 다시 확인 해 주세요");
        }
    }

    return(
        <div>
            <div className='userInfo-box'>
                <div className="userInfo-bar">
                <span>회원정보</span>
                </div>
                <div className='userInfo-info'>

                <div className='userInfo-info-input-username'>
                    <div className='userInfo-info-input'>
                    <span className='userInfo-id'>아이디 </span> 
                    <div>{userInfo.username}</div>
                    </div>
                </div>
                {!isChange && (
                <div className='userInfo-info-input-password'>
                    <div className='userInfo-info-input'>
                    <span className='userInfo-password'>비밀번호</span>
                    <div className='userInfo-password-star'>****</div>
                    </div>
    
                </div>)}
                {isChange && (
                    <>
                    <div className='userInfo-info-input-old-password'>
                        <span className='old-password'>현재 비밀번호</span>
                        <input
                        className='signup-text-input'
                        type="password"
                        name='oldPassword'
                        placeholder="비밀번호 입력"
                        value={passwordData.oldPassword}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='userInfo-info-input-new-password'>
                        <span className='new-password'>변경 비밀번호</span>
                        <input
                        className='signup-text-input'
                        type="password"
                        name='newPassword'
                        placeholder="비밀번호 입력"
                        value={passwordData.newPassword}
                        onChange={handleInputChange}
                        onBlur={checkPasswordPattren}
                        />
                    </div>
                    {patternCheck.password === false &&<div className='pattern-check-false'>비밀번호는 영어 대소문자와 숫자를 포함하여<br></br> 8자 이상 15자 이하만 가능합니다.</div>}
                    <div className='userInfo-info-input-confirm-password'>
                        <span className='new-password'>비밀번호 확인</span>
                        <input
                        className='signup-text-input'
                        type="password"
                        name='confirmPassword'
                        placeholder="비밀번호 입력"
                        value={passwordData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={checkConfirmPassword}
                        />
                    </div>
                    {confirmedPassword === false &&<div className='pattern-check-false'>비밀번호가 일치하지 않습니다.</div>}
                    {isChange && <button className='password-change-confirm-button' onClick={handleConfirmPasswordChange}>변경</button>}
                    </>
           
                    )}

                {!isChange && <button className='password-change-button' onClick={changePassword}>변경</button>}

                <div className='userInfo-info-input-email'>
                    <div className='userInfo-info-input'>
                    <span className='userInfo-email'>이메일</span>
                    <div>{userInfo.email}</div>
                    </div>
                </div>

                </div>
                <div className='userInfo-button-container'>
                <button className='userInfo-button' onClick={() => navigate(-1)}>뒤로가기</button>
                <button className='userInfo-button' onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
};
export default UserInfo;