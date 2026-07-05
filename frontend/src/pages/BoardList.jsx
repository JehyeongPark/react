 import { useState, useEffect } from 'react'
  import { useNavigate } from 'react-router-dom'
  import api from '../api/axios'
  import '../styles/common.css'
  import './BoardList.css'

  function BoardList() {
    const [boardList, setBoardList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      api.get('/board')
        .then(res => setBoardList(res.data))
        .catch(err => console.error(err))
    }, [])

    return (
      <div className="container">
        <div className="board-header">
          <h1>게시판</h1>
          <div className="board-header-actions">
            <button className="btn-secondary home-btn" onClick={() => navigate('/')}>홈으로</button>
            <button className="btn-primary write-btn">글쓰기</button>
          </div>
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
      </div>
    )
  }

  export default BoardList