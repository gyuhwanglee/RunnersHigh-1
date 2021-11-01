import React from 'react'
import '../stylesheet/mainpage.css'
function MainPage () {
  return (
    <div className='main_container'>
      <div className='main_serch_div'>
        <input type='text' className='main_serch' placeholder='serch' />
        <button>검색</button>
      </div>
      <div className='main_svg'>
        <svg xmlns='http://www.w3.org/2000/svg' width='373.383' height='395.216' viewBox='0 0 373.383 395.216'>
          <path id='패스_2916' data-name='패스 2916' d='M104.5-120.283C138.4-86.469,170.7-55.7,184.7-12.651s9.8,98.307-24.1,140.314c-33.8,41.92-97.2,70.68-164.3,73.817-67,3.225-137.7-19.086-164.1-61.093C-194.1,98.38-176,36.764-161-11.693c15.1-48.456,27.3-83.84,53.6-117.655s66.9-66.235,104.8-63.969c38,2.266,73.3,39.131,107.1,73.033' transform='translate(181.164 193.429)' fill='#afb9e2' opacity='0.43' />
        </svg>
      </div>

      <div className='main_contents_first'>
        <div className='main_image'>이미지</div>
        <div className='main_text'>본문</div>
        <div className='main_footer'>
          <span>작성자</span>
          <span>작성일</span>
        </div>
      </div>
      <div className='main_svg2'>
        <svg xmlns='http://www.w3.org/2000/svg' width='373.383' height='350.216' viewBox='0 0 373.383 395.216'>
          <path id='패스_2916' data-name='패스 2916' d='M104.5-120.283C138.4-86.469,170.7-55.7,184.7-12.651s9.8,98.307-24.1,140.314c-33.8,41.92-97.2,70.68-164.3,73.817-67,3.225-137.7-19.086-164.1-61.093C-194.1,98.38-176,36.764-161-11.693c15.1-48.456,27.3-83.84,53.6-117.655s66.9-66.235,104.8-63.969c38,2.266,73.3,39.131,107.1,73.033' transform='translate(181.164 193.429)' fill='#afb9e2' opacity='0.43' />
          <rect width='200' x='150' y='50' />
        </svg>
      </div>
    </div>

  )
}

export default MainPage
