import React, { useState, useEffect } from 'react';
import './css/AboutSite.css';

const AboutSite = () => {
    const [displayText, setDisplayText] = useState('');
    const pageOneText = '안녕하세요! 이 페이지는 CEP(편의점 행사상품 조회)을 소개하는 페이지입니다.'; 
    const down = '/down.png';
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        const typingEffect = () => {
            for (let i = 0; i < pageOneText.length; i++) {
                setTimeout(() => {
                    setDisplayText(prev => prev + pageOneText[i]);
                }, 50 * i);
            }
        };
        typingEffect();
        return () => setDisplayText('');
    }, []);

    // 페이지 배열 
    const pages = [
        {
            id: 1,
            content: (
                <div className="page-one">
                    <p className="page-one-introduction">{displayText} </p>
                    <img src={down} alt={down} className="down-icon" />
                </div>
            ),
        },
        {
            id: 2,
            content: (
                <div className="page-two">
                    <div className="about-site-index">목차</div>
                    <div className="horizontal-line"></div>
                    <div className="vertical-line"></div>
                    <div className="introduction">
                        <div className="planning-intention">
                            <p>1.프로젝트 기획 의도</p>
                            <div className="planning-intention-space"></div>
                            <p>2.프로젝트 소개</p>
                            <div className="planning-intention-space"></div>
                            <p>3.적용 기술 및 적용 의도</p>
                            <li className="planning-intention-sub-item">React</li>
                            <li className="planning-intention-sub-item">Spring Boot</li>
                            <li className="planning-intention-sub-item">Selenium, jsoup</li>
                            <li className="planning-intention-sub-item">QueryDSL</li>
                            <li className="planning-intention-sub-item">docker</li>
                            <div className="planning-intention-space"></div>
                            <p>4.개선점</p>
                            <li className="planning-intention-sub-item">로드밸런싱</li>
                            <li className="planning-intention-sub-item">서비스 분리</li>
                        </div>
                    </div>
                    <img src={down} alt={down} className="down-icon" />
                </div>
            ),
        },
    ];

    useEffect(() => {
        let scrollTimeout = null;

        const handleWheel = (event) => {
            if (scrollTimeout) return;

            if (event.deltaY > 0 && pageNum < pages.length - 1) { // 아래로 스크롤
                setPageNum(prev => prev + 1);
            } else if (event.deltaY < 0 && pageNum > 0) { // 위로 스크롤
                setPageNum(prev => prev - 1);
            }

            // 스크롤 이벤트가 너무 자주 발생하지 않도록 딜레이 추가
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 600); // 페이지 전환 딜레이
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [pageNum, pages.length]);

    return (
        <div className='about-site-background'>
            <div className='pages-wrapper' style={{ transform: `translateY(-${pageNum * 100}vh)`, transition: 'transform 0.6s ease' }}>
                {pages.map(page => (
                    <div key={page.id} className='page'>
                        {page.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutSite;
