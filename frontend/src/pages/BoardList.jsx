  import { useState, useEffect } from 'react'
  import { useNavigate } from 'react-router-dom'
  import api from '../api/axios'
  import '../styles/common.css'
  import './BoardList.css'

  function BoardList() {
    const [boardList, setBoardList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const size = 10
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState('title')
    const [keyword, setKeyword] = useState('')

    const fetchBoardList = (type, word, pageNum) => {
      api.get('/board', { params: { searchType: type, keyword: word, page: pageNum, size } })
        .then(res => {
          setBoardList(res.data.list)
          setTotalCount(res.data.totalCount)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchBoardList(searchType, keyword, page)
    }, [page])

    const handleSearch = () => {
      setPage(1)
      fetchBoardList(searchType, keyword, 1)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleSearch()
    }

    const totalPages = Math.max(Math.ceil(totalCount / size), 1)

    return (
      <div className="container">
        <div className="board-header">
          <h1>게시판</h1>
          <div className="board-search">
            <select
              className="search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-primary search-btn" onClick={handleSearch}>검색</button>
          </div>
        </div>

        <div className="board-header-actions">
          <button className="btn-secondary home-btn" onClick={() => navigate('/')}>홈으로</button>
          <button className="btn-primary write-btn" onClick={() => navigate('/board/write')}>글쓰기</button>
        </div>
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">게시글이 없습니다.</td>
              </tr>
            ) : (
              boardList.map(board => (
                <tr
                  key={board.boardNo}
                  className="board-row"
                  onClick={() => navigate(`/board/${board.boardNo}`)}
                >
                  <td>{board.boardNo}</td>
                  <td className="title">{board.title}</td>
                  <td>{board.writer}</td>
                  <td>{board.regDt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={num === page ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="btn-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            다음
          </button>
        </div>
      </div>
    )
  }

  export default BoardList