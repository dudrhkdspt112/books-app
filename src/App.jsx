import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');  // 검색어 상태
  const [books, setBooks] = useState([]);  // 도서 목록 상태
  const [loading, setLoading] = useState(false);  // 로딩 상태

  const apiKey = 'efaecf4bfac95a45ded3847cfe606f0a';  // 카카오 API 키를 넣어주세요

  // 도서 검색 함수
  const searchBooks = () => {
    if (!query) return;  // 검색어가 없으면 아무것도 하지 않음
    
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://dapi.kakao.com/v3/search/book',
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
      params: {
        query: query,
        size: 10,  // 검색할 책의 수 (최대 50)
      }
    })
      .then((response) => {
        setBooks(response.data.documents);  // 도서 목록 업데이트
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from Kakao API:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>카카오 도서 검색</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={searchBooks} disabled={loading}>
          {loading ? '검색 중...' : '검색'}
        </button>
      </div>

      {loading && <p className="loading">로딩 중...</p>}

      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                {book.thumbnail && (
                  <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
                )}
                <h2>{book.title}</h2>
                <p>{book.authors.join(', ')}</p>
                <p>{book.publisher}</p>
                <a href={book.url} target="_blank" rel="noopener noreferrer">
                  자세히 보기
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default App;