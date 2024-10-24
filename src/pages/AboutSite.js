import React, { useState, useEffect } from 'react';
import './css/AboutSite.css';

const AboutSite = () => {
    const down = '/down.png';
    const webpgToMobile = '/webpgToMobile.png';
    const pagePicture = '/page-picture.png'
    const reactIcon = '/react.png';
    const springBootIcon = '/springBoot.png';
    const selenuimWithJsoup = '/SeleniumWithJsoup.png';
    const queryDSLLogo = '/QueryDSL.png';
    const workflow = '/workflow.png';
    const gatlingGraph = '/gatlingGraph.png';
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
                    <p>바닐라 자바스크립트에 비해 다음과 같은 기능들이 편리하다고 생각해 사용했습니다.</p>
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
                <div className="page-six">
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
                <div className="page-seven">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - Selenuim, Jsoup</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={selenuimWithJsoup} alt={selenuimWithJsoup} className="selenuimWithJsoup-icon" />
                    </div>
                    <div className='page-explanation-area'>
                    <p>- Jsoup은 편의점 행사상품 페이지의 정적 데이터를 크롤링하기 위해 사용하였습니다.</p>
                    <p>- Selenium은 Selenium을 통해 브라우저를 직접 제어하여 무한 스크롤이나 다음 페이지 버튼을 조작해, 다음 데이터를 불러올 필요성이 <br></br>
                    &nbsp;&nbsp;있었기 때문에 사용하였습니다.</p>
                    <p>- 정리하자면,  Jsoup를 통해 로딩된 데이터를 수집하고 Selenium을 통해 다음페이지를 로딩 하는 방식으로 Jsoup과 Selenium을 조합하여 <br></br> 
                    &nbsp;&nbsp;사용하였습니다.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 8,
            content: (
                <div className="page-eight">
                    <div className='title-div'>
                        <div className="about-site-index">3.적용 기술 및 적용 의도 - QueryDSL</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={queryDSLLogo} alt={queryDSLLogo} className="queryDSL-logo" />
                    </div>
                    <div className='page-explanation-area'>
                        <p>다음과 같은 이유로 사용했습니다.</p>
                        <p>&nbsp;&nbsp;- CEP에서는 사용자가 다양한 검색 조건을 선택할수 있는데, 이런 조건에서 Spring Data JPA를 사용하는 것 보다 QueryDSL을 사용했을 때<br></br>
                        &nbsp; &nbsp;&nbsp;보다 간결하고 쉽게 조건문을 처리할 수 있고, 이러한 점이 Spring Data JPA에 비해 유지보수 측면에서 유리하다 생각해 사용하였습니다.</p>
                        <p>&nbsp;&nbsp;- 또한 조건에 따라 필터나 검색 조건을 동적으로 추가하거나 제거할 수 있어 Spring Data JPA를 사용해 처리하기 불편한, 동적 데이터 처리에<br></br>
                        &nbsp;&nbsp;&nbsp; 이점이 있다고 생각해 사용했습니다.</p>
                        <p>&nbsp;&nbsp;- QueryDSL을 사용하면 쿼리가 코드 형태로 작성되기 때문에 가독성이 좋고 이 또한 유지보수에 유리하다고 생각되어 사용했습니다.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 9,
            content: (
                <div className="page-nine">
                    <div className='title-div'>
                        <div className="about-site-index">4.개선점 - 로드밸런싱</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={gatlingGraph} alt={gatlingGraph} className="gatling-graph" />
                    </div>
                    <div className='page-explanation-area'>
                        <p>&nbsp;&nbsp;- 쓰고있는 서버의 성능이 좋은편은 아닌데, 서버의 성능이 좋지 않더라도 어느정도의 응답 속도는 보장해줘야한다고 생각해 로드밸런싱을 <br></br>
                        &nbsp;&nbsp; &nbsp;적용했습니다.</p>
                        <p>&nbsp;&nbsp;- 기존에 모든 요청이 단일 서버로 집중되고 있었는데 로드밸런싱을 통해 요청을 분산하면 서버 과부화 방지와 응답속도 개선에 효과가 있을<br></br> 
                        &nbsp;&nbsp; &nbsp;것 이라고 생각했습니다.</p>
                        <p>&nbsp;&nbsp;- 로드 밸런싱 후 테스트 결과 0.8초이내 응답률 15% 에서 36%로 증가하였고, 1.2초 초과 응답률은 84%에서 58%로 감소하는 등 유의미<br></br> 
                        &nbsp;&nbsp; &nbsp;한 결과를 보였습니다.(gatling 테스트 결과)</p>
                    </div>
                </div>
            ),
        },
        {
            id: 10,
            content: (
                <div className="page-ten">
                    <div className='title-div'>
                        <div className="about-site-index">4.개선점 - 서비스 분리</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-picture-area'>
                    <img src={workflow} alt={workflow} className="workflow" />
                    </div>
                    <div className='page-explanation-area'>
                        <p>&nbsp;- 로드밸런싱을 적용하며 파생된 문제입니다. api서비스 코드와 크롤링 스케줄 서비스 코드가 통합되어 있어, 로드밸런싱시 스케줄 서비스가 <br></br>
                        &nbsp;&nbsp; 중복 실행되는 문제가 생길 수 밖에 없었습니다.</p>
                        <p>&nbsp;- 크롤링 스케줄링 서비스는 외부 데이터를 크롤링해오다 보니 오류가 생기는 경우가 있는데, 서비스를 분리하면 스케줄 중복실행 문제를 방지<br></br>
                        &nbsp;&nbsp; 하는 것 뿐만 아니라 스케줄 서비스가 오류가 생겨도 스케줄 서비스의 상태와 상관없이 api서비스를 운영 할 수 있어 이점이 있다고 생각했습<br></br>
                        &nbsp;&nbsp; 니다.</p>
                        <p>&nbsp;- 또한 스케줄링 서비스는 업데이트를 잘 하지 않고, api서비스와는 다른 성격을 띄고 있어 서비스를 분리하는 것이 유지보수에 더 좋다고 생각<br></br>
                        &nbsp;&nbsp; 했습니다.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 11,
            content: (
                <div className="page-eleven">
                    <div className='title-div'>
                        <div className="about-site-index">5.향후 개선 사항 및 계획</div>
                        <div className="horizontal-line"></div>
                    </div>
                    <div className='page-explanation-area-long'>
                        <p className='page-explanation-title'>무중단 배포</p>
                        <p>&nbsp;&nbsp;- 서비스 운영 중에도 패치 및 업데이트를 진행할 수 있는 무중단 배포를 적용하여, 서비스 이용에 영향을 주지 않도록 개선할<br></br>
                        &nbsp; &nbsp; 생각입니다.</p>
                        <p>&nbsp;&nbsp;- 기존에 사용하고 있는 Docker Compose와 Nginx를 활용하여 무중단 배포를 적용 해 볼 생각입니다.</p>
                        <p className='page-explanation-title'>서비스 분리</p>
                        <p>&nbsp;&nbsp;- API 서비스 분리를 적용 해 볼 생각입니다.</p>
                        <p>&nbsp;&nbsp;-  프로젝트에 문제도 많고 개선해야 점이 있다고 생각하는데, 서비스 분리를 하면 하나의 서비스 개선작업에서 문제가 생기거나 <br></br>
                        &nbsp; &nbsp; 다른 이유로 문제가 생기더라도 다른 서비스에 영향을 끼치지 않아 더 관리가 편할 것이라 생각해 세분화된 서비스 분리가 필요<br></br>
                        &nbsp; &nbsp; 하다 생각했습니다.</p>
                        <p>&nbsp;&nbsp;- Spring Cloud Gateway를 API Gateway로 사용한 서비스 분리를 적용 해 볼 생각입니다.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 12,
            content: (
                <div className="page-twelve">
                   <p className="page-twelve-introduction">읽어주셔서 감사합니다!</p>
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
        { id: 9, content:  <p className="page-index-title"> 4.개선점 </p>},
        { id: 9, content:   <p className="page-index-element">- 로드밸런싱</p>},
        { id: 10, content:    <p className="page-index-element">- 서비스 분리</p>},
        { id: 11, content:    <p className="page-index-title">5. 향후 개선 사항 및 계획</p>},
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
            {pages.map((page, index) => (
                <div key={page.id} className={`page ${pageNum === page.id - 1 ? 'active' : ''}`}>
                    {page.content}
                    {index < pages.length - 1 && (
                    <img src={down} alt={down} className="down-icon" onClick={handlePageDownButton} />
                    )}
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
