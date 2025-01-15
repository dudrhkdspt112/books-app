import axios from 'axios';

// 카카오 API 호출 함수
export const fetchBooks = async (query) => {
    const apiKey = import.meta.env.VITE_KAKAO_API_KEY;  // 환경 변수로 API 키 저장
    
    try {
        const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
        headers: {
            Authorization: `KakaoAK ${apiKey}`,
        },
        params: {
            query: query,  // 검색어
            sort: 'accuracy',
            page:1,
            size: 10,  // 검색 결과 개수
        },
        });
        return response.data.documents;  // 책 정보 반환
    } catch (error) {
        console.error('카카오 API 호출 실패:', error);
        return [];
    }
};