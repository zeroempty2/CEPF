import React, { useState, useEffect } from 'react';
import './css/AboutSite.css';

const AboutSite = () => {
    const [displayText, setDisplayText] = useState('');
    const [displayText2, setDisplayText2] = useState('');
    const pageOneText = '안녕하세요! 이 페이지는 CEP(편의점 행사상품 조회)을 소개하는 페이지입니다.'; 
    const pageOneText2 = '※ 이 페이지는 1920 x 1080 해상도에 최적화되어 있습니다.';
    const down = '/down.png';
    const [pageNum, setPageNum] = useState(0);
    const [isLeft, setIsLeft] = useState(false); // 마우스 위치 상태 저장

    const handlePageDownButton = () => {
        if(pageNum < pages.length - 1) setPageNum(prev => prev + 1);
    }

    useEffect(() => {
        const typingEffect = () => {
            for (let i = 0; i < pageOneText.length; i++) {
                setTimeout(() => {
                    setDisplayText(prev => prev + pageOneText[i]);
                    if (i === pageOneText.length - 1) {
                        setTimeout(() => {
                            const typingEffect2 = () => {
                                for (let j = 0; j < pageOneText2.length; j++) {
                                    setTimeout(() => {
                                        setDisplayText2(prev => prev + pageOneText2[j]);
                                    }, 50 * j);
                                }
                            };
                            typingEffect2();
                        }, 500);
                    }
                }, 50 * i);
            }
        };
        typingEffect();
        return () => {
            setDisplayText('');
            setDisplayText2('');
        };
    }, []);

    const handleMouseMove = (event) => {
        const screenWidth = window.innerWidth;
        const leftBoundary = screenWidth * 0.35;  
        const rightBoundary = screenWidth * 0.45; 

        if (event.clientX < leftBoundary) {
            setIsLeft(true);  
        } else if (event.clientX > rightBoundary) {
            setIsLeft(false); 
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // 페이지 배열
    const pages = [
        {
            id: 1,
            content: (
                <div className="page-one">
                    <p className="page-one-introduction">{displayText} <br></br> <p className='page-notice'>{displayText2}</p></p>
                </div>
            ),
        },
        {
            id: 2,
            content: (
                <div className="page-two">
                    <div className='title-div'>
                        <div className="about-site-index">목차</div>
                        <div className="horizontal-line"></div>
                    </div>
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
                            <li className="planning-intention-sub-item">Selenium, Jsoup</li>
                            <li className="planning-intention-sub-item">QueryDSL</li>
                            <li className="planning-intention-sub-item">docker</li>
                            <div className="planning-intention-space"></div>
                            <p>4.개선점</p>
                            <li className="planning-intention-sub-item">로드밸런싱</li>
                            <li className="planning-intention-sub-item">서비스 분리</li>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            content: (
                <div className="page-three">
                    <div className='title-div'>
                        <div className="about-site-index">1.프로젝트 기획 의도</div>
                        <div className="horizontal-line"></div>
                    </div>
                </div>
            ),
        },
    ];

    const pageIndex = [
        { id: 1, content: <p className="page-index-title"> 메인</p> },
        { id: 2, content: <p className="page-index-title"> 목차</p> },
        { id: 3, content: <p className="page-index-title"> 1.프로젝트 기획 의도 </p> },
        { id: 4, content: <p className="page-index-title"> 2.프로젝트 소개 </p> },
        {id: 5, content:  <p className="page-index-title"> 3.적용 기술 및 적용 의도</p>},
        { id: 6, content:<p className="page-index-element">- React</p>},
        { id: 7, content:<p className="page-index-element">- Spring Boot</p>},
        { id: 8, content:<p className="page-index-element">- Selenuim, Jsoup</p>},
        { id: 9, content:<p className="page-index-element">- QueryDSL</p>},
        { id: 10, content:<p className="page-index-element">- docker</p> },
        { id: 11, content:  <p className="page-index-title"> 4.개선점 </p>},
        { id: 12, content:   <p className="page-index-element">- 로드밸런싱</p>},
        { id: 13, content:    <p className="page-index-element">- 서비스 분리</p>},

    ];

    const handleIndexClick = (id) => {
        setPageNum(id - 1);
    };

    useEffect(() => {
        let scrollTimeout = null;

        const handleWheel = (event) => {
            if (scrollTimeout) return;

            if (event.deltaY > 0 && pageNum < pages.length - 1) {
                setPageNum(prev => prev + 1);
            } else if (event.deltaY < 0 && pageNum > 0) {
                setPageNum(prev => prev - 1);
            }

            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 600);
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [pageNum, pages.length]);

    return (
        <div className='about-site-background'>
            <div className='pages-wrapper' style={{ transform: `translateY(-${pageNum * 100}vh)` }}>
                {pages.map(page => (
                    <div key={page.id} className={`page ${pageNum === page.id - 1 ? 'active' : ''}`}>
                        {page.content}
                        <img src={down} alt={down} className="down-icon" onClick={handlePageDownButton} />
                    </div>
                ))}
            </div>
            <div className={`index-box ${isLeft ? 'left' : ''}`}>
                {pageIndex.map(i => (
                        <div
                            key={i.id}
                            className={`index ${pageNum === i.id - 1 ? 'active' : ''}`}
                            onClick={() => handleIndexClick(i.id)}
                        >
                            {i.content}
                        </div>
                ))}
            </div>
        </div>
    );
};

export default AboutSite;
