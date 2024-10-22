import React, { useState, useEffect } from 'react';
import './css/AboutSite.css';

const AboutSite = () => {
    const down = '/down.png';
    const webpgToMobile = '/webpgToMobile.png';
    const pagePicture = '/page-picture.png'
    const reactIcon = '/react.png';
    const springBootIcon = '/springBoot.png';

    const [displayText, setDisplayText] = useState('');
    const [displayText2, setDisplayText2] = useState('');
    const pageOneText = '안녕하세요! 이 페이지는 CEP(편의점 행사상품 조회)을 소개하는 페이지입니다.'; 
    const pageOneText2 = '※ 이 페이지는 1920 x 1080 해상도에 최적화되어 있습니다.';
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
                            <div className="planning-intention-space"></div>
                            <p>5.향후 개선 사항 및 계획</p>
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
                    <div className='page-picture-area'>
                    <img src={webpgToMobile} alt={webpgToMobile} className="webpg-to-mobile" />
                    </div>
                    <div className='page-explanation-area'>
                        <p>- 편의점 1 + 1행사, 2 + 1 행사 등을 자주 이용하는 편인데, 모바일 기기를 이용해 언제든 행사상품을 확인하고 구매하러 가는게 <br></br>
                        &nbsp;&nbsp;편하지 않을까? 하는 생각에 제작한 웹 페이지 입니다.</p>
                        <p>- 각 편의점별로 행사상품 정보를 제공하는 페이지가 있지만, 모바일에서 원하는 정보를 쉽고 빠르게 찾기가 용이하지 않고, <br></br>&nbsp;&nbsp;각 편의점별로 따로 조회해야하는 불편함이 존재해 이를 해소한 웹 페이지를 제작하고자 했습니다.</p>
                        <p>- 따라서, 모바일에서 사용되는 환경을 고려하여 웹 페이지를 설계하고, 제작하게 되었습니다.  </p>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            content: (
                <div className="page-four">
                    <div className='title-div'>
                        <div className="about-site-index">2.프로젝트 소개</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={pagePicture} alt={pagePicture} className="normal-page" />
                    </div>
                    <div className='page-explanation-area'>
                        <p>- 각 편의점별, 행사종류 별로 행사상품을 조회할 수 있습니다.</p>
                        <p>- 분류된 편의점, 행사종류 상품들을 검색 할 수 있습니다. </p>
                        <p>- 로그인 시 즐겨찾기 기능을 사용 할 수 있습니다.</p>
                        <p>- 즐겨찾기 된 상품을 편의점 종류별, 행사종류, 행사 진행 상태로 분류해서 조회할수 있습니다. </p>
                        <p>- 즐겨찾기 내 상품들을 검색해서 조회할 수 있습니다. </p>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            content: (
                <div className="page-five">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - React</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={reactIcon} alt={reactIcon} className="react-icon" />
                    </div>
                    <div className='page-explanation-area'>
                    <p>바닐라 자바스크립트에 비해 다음과 같은 기능들이 편리해 보여 사용했습니다.</p>
                    <p>&nbsp;&nbsp;- async와 await를 사용한 비동기 작업 처리</p>
                    <p>&nbsp;&nbsp;- 컴포넌트를 통한 페이지 유지보수의 용이함</p>
                    <p>&nbsp;&nbsp;- useState를 이용한 초기값 관리와 상태 업데이트 관리</p>
                    <p>&nbsp;&nbsp;- React Router라이브러리를 이용한 페이지 이동 관리</p>
                    </div>
                </div>
            ),
        },
        {
            id: 6,
            content: (
                <div className="page-five">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - Spring Boot</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={springBootIcon} alt={springBootIcon} className="spring-boot-icon" />
                    </div>
                    <div className='page-explanation-area'>
                    <p>다음과 같은 이유로 사용했습니다.</p>
                    <p>&nbsp;&nbsp;- Spring Security, Spring Data 같은 라이브러리를 이용한 기능 확장성</p>
                    <p>&nbsp;&nbsp;- @Transactional과 같은 Spring Boot의 자체 어노테이션을 사용한 코드의 간결함과 유지보수성 향상</p>
                    <p>&nbsp;&nbsp;- Spring Data JPA를 통한 CRUD의 편의성과 엔티티 중심의 데이터 관리</p>
                    </div>
                </div>
            ),
        },
        {
            id: 7,
            content: (
                <div className="page-five">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - Selenuim, Jsoup</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={reactIcon} alt={reactIcon} className="react-icon" />
                    </div>
                    <div className='page-explanation-area'>

                    </div>
                </div>
            ),
        },
        {
            id: 8,
            content: (
                <div className="page-five">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - QueryDSL</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={reactIcon} alt={reactIcon} className="react-icon" />
                    </div>
                    <div className='page-explanation-area'>

                    </div>
                </div>
            ),
        },
        {
            id: 9,
            content: (
                <div className="page-five">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - docker</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={reactIcon} alt={reactIcon} className="react-icon" />
                    </div>
                    <div className='page-explanation-area'>

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
        { id: 5, content:<p className="page-index-element">- React</p>},
        { id: 6, content:<p className="page-index-element">- Spring Boot</p>},
        { id: 7, content:<p className="page-index-element">- Selenuim, Jsoup</p>},
        { id: 8, content:<p className="page-index-element">- QueryDSL</p>},
        { id: 9, content:<p className="page-index-element">- docker</p> },
        { id: 10, content:  <p className="page-index-title"> 4.개선점 </p>},
        { id: 10, content:   <p className="page-index-element">- 로드밸런싱</p>},
        { id: 11, content:    <p className="page-index-element">- 서비스 분리</p>},
        { id: 12, content:    <p className="page-index-title">5. 향후 개선 사항 및 계획</p>},
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
