import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './css/SignUp.css';
import { URL_VARIABLE } from "./export/ExportUrl";

const SignUp = () => {
    const navigate = useNavigate();

    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const [checkingPassword, setCheckingPassword] = useState(false);

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        passwordConfirm:'',
        email:''
      });

    const [checkData, setCheckData] = useState({
        username:null,
        password:null,
        email:null
    })

    const [patternCheck, setPatternCheck] = useState({
        username:null,
        password:null,
        email:null
    })

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if(name === 'username' && checkData.username){
            setCheckData({
                ...checkData,
                username:false
            });
        }
        setUserData({
          ...userData,
          [name]: value
        });
      };

      const handleSignup = async () => { 
        try {
         await axios.post( URL_VARIABLE + 'users/signUp', {
            username: userData.username,
            password: userData.password,
            email: userData.email
        });
         navigate('/'); 
        } catch (error) {
          alert("입력하신 정보를 다시 확인하여 주세요");
        }
      };

      const checkUsername = async () => { 
        if(patternCheck.username === null || patternCheck.username === false){
            alert("입력하신 정보를 다시 확인해 주세요");
            return;
        }
        try {
            const response = await axios.post( URL_VARIABLE + 'users/check/name', {
                username: userData.username
            }, {
                headers: {
                    'Content-Type': 'application/json', 
                }
            });
            if(!response.data){
                setCheckData({
                    ...checkData,
                    username:true
                });
            }
        } catch (error) {
          alert("입력하신 정보를 다시 확인하여 주세요");
        }
      };

      const checkUsernamePattren = () => {
        const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;

        if(checkData.username === null){
            checkData.username = false;
        }
            usernamePattern.test(userData.username) ? setPatternCheck({
                ...patternCheck,
                username:true
            }) : 
            setPatternCheck({
                ...patternCheck,
                username:false
            })
        
    };

    const checkPasswordPattren = () => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,15}$/;

           if(pattern.test(userData.password)) {
            setCheckingPassword(false);
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

    const checkEmailPattren = () => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if(pattern.test(userData.email)) {
            setPatternCheck({
                ...patternCheck,
                email:true
            }) 
            setCheckData({
                ...checkData,
                email:true
            });
        }
       else{
        setPatternCheck({
            ...patternCheck,
            email:false
        })
    } 
        
    };

    const checkPassword = () => {
        if(!patternCheck.password){
            setCheckingPassword(true);
        }
        else if (userData.password === userData.passwordConfirm) {
            setCheckData({
                ...checkData,
                password:true
            });
        }
        else{
            setCheckData({
                ...checkData,
                password:false
            });
        }
        
    };

    
    const validateFields = () => {
        let allValid = true; 
        let updatedData = {}; 
        console.log(checkData);

        for (const [key, value] of Object.entries(checkData)) {
            if (value === null)  {
                allValid = false;
                updatedData[key] = null; 
            } 
            else if(value === false){
                allValid = false;
                updatedData[key] = false; 
            }
            else {
                updatedData[key] = true; 
            }
        }
        setCheckData(updatedData);
        setConfirmSignUp(true);

        if (!allValid) {
            alert("입력하신 정보를 다시 확인해 주세요.");
        } else {
            handleSignup();
        }
    };


    return(
        <div>
            <div className='signup-box'>
                <div className="signup-bar">
                    <span>회원가입</span>
                </div>
                <div className='signup-info'>

                <div className='signup-info-input-username'>
                        <div className='signup-info-input'>
                            <span className='signup-id'>아이디 </span> 
                            <input
                                className='signup-text-input'
                                type="text"
                                placeholder="아이디 입력"
                                name='username'
                                value={userData.username}
                                onChange={handleInputChange}
                                onBlur={checkUsernamePattren}
                            />
                        </div>
                        {checkData.username === true && <div className='dup-check-true'>중복확인 완료!</div>}
                        {confirmSignUp && checkData.username === null && patternCheck.username === null && <div className='pattern-check-false'>아이디를 입력해 주세요</div>}
                        {checkData.username === false && patternCheck.username === true && <div className='pattern-check-false'>중복확인 해주세요</div>}
                        {patternCheck.username === false &&<div className='pattern-check-false'>닉네임은 영어 대소문자와 숫자를 포함하여<br></br> 4자 이상 12자 이하만 가능합니다.</div>}
                </div>
                    <button className='id-check-button' onClick={checkUsername}>중복확인</button>

                    <div className='signup-info-input-password'>
                        <div className='signup-info-input'>
                            <span className='signup-password'>비밀번호</span>
                            <input
                                className='signup-text-input'
                                type="password"
                                name='password'
                                placeholder="비밀번호 입력"
                                value={userData.password}
                                onChange={handleInputChange}
                                onBlur={checkPasswordPattren}
                            />
                        </div>
                        {confirmSignUp && checkData.password  === null && patternCheck.password === null && <div className='pattern-check-false'>비밀번호를 입력해 주세요</div>}
                        {patternCheck.password === false &&<div className='pattern-check-false'>비밀번호는 영어 대소문자와 숫자를 포함하여<br></br> 8자 이상 15자 이하만 가능합니다.</div>}
                    </div>
                    <div className='signup-info-input-password-confirm'>
                        <div className='signup-info-input'>
                            <span className='signup-password-check'>비밀번호 확인</span>
                            <input
                                className='signup-text-input'
                                type="password"
                                name='passwordConfirm'
                                placeholder="비밀번호 확인"
                                value={userData.passwordConfirm}
                                onChange={handleInputChange}
                                onBlur={checkPassword}
                            />
                        </div>
                        {checkingPassword &&<div className='pattern-check-false'>비밀번호를 확인해 주세요.</div>}
                        {checkData.password === false &&<div className='pattern-check-false'>비밀번호가 일치하지 않습니다.</div>}
                    </div>
               
                    <div className='signup-info-input-email'>
                        <div className='signup-info-input'>
                            <span className='signup-email'>이메일</span>
                            <input
                                className='signup-text-input'
                                type="text"
                                name='email'
                                placeholder="이메일 입력"
                                value={userData.email}
                                onChange={handleInputChange}
                                onBlur={checkEmailPattren}
                            />
                        </div>
                        {confirmSignUp && checkData.email  === null && patternCheck.email === null && <div className='pattern-check-false'>이메일을 입력해 주세요</div>}
                        {patternCheck.email === false &&<div className='pattern-check-false'>이메일 형식이 아닙니다.</div>}
                    </div>
                  
                </div>
                <div className='signup-button-container'>
                    <button className='signup-button' onClick={() => navigate(-1)}>뒤로가기</button>
                    <button className='signup-button' onClick={validateFields}>회원가입</button>
                </div>
            </div>

            
           
        </div>
    );
};
export default SignUp;