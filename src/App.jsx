import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 네이버 도서 API
    const getBookData = async (query) => {
        const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_NAVER_CLIENT_SECRET;

        try {
            setLoading(true);
            setError('');  // 에러 상태 초기화
            const res = await axios.get('https://openapi.naver.com/v1/search/book.json', {
                params: { query, display: 10 },
                headers: {
                    'X-Naver-Client-Id': clientId,
                    'X-Naver-Client-Secret': clientSecret,
                },
            });
            setBooks(res.data.items);
        } catch (error) {
            console.error('API 호출 실패', error);
            setError('도서 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    // 검색 버튼 클릭 시 호출되는 함수
    const handleSearch = () => {
        if (!query) {
            alert('검색어를 입력하세요.');
            return;
        }
        getBookData(query);  // 검색어가 있을 경우 API 호출
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>네이버 도서 검색</h1>

            {/* 검색어 입력 필드 */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}  // 입력값 변경 시 상태 업데이트
                placeholder="책 제목을 입력하세요"
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px 15px' }}>
                검색
            </button>

            {/* 로딩 중 표시 */}
            {loading && <p>로딩 중...</p>}

            {/* 오류 메시지 표시 */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* 책 리스트 출력 */}
            <ul>
                {books.map((book) => (
                    <li
                        key={book.isbn || book.title}  // 고유한 값 사용
                        style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
                    >
                        <h3>{book.title}</h3>
                        <p><strong>저자:</strong> {book.author}</p>
                        <p><strong>출판사:</strong> {book.publisher}</p>
                        {book.image && <img src={book.image} alt={book.title} style={{ width: '100px', height: '150px' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
