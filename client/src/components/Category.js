import React from 'react'
import '../stylesheet/mainpage.css'
function Category ({ filteredPost }) {
  const location = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']
  return (
    <div className='category_container'>
      {location.map((el, idx) => {
        return <li key={idx} onClick={() => filteredPost(el)}>{el}</li>
      })}
    </div>
  )
}

export default Category
