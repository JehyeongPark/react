import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/common.css'
import './BoardDetail.css'

function BoardDetail() {
  const { boardNo } = useParams()
  const [board, setBoard] = useState(null)
  const navigate = useNavigate()

  // 상세
  useEffect(() => {
    api.get(`/board/${boardNo}`)
      .then(res => setBoard(res.data))
      .catch(err => console.error(err))
  }, [boardNo])

  // 삭제
  const handleDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return
    await api.delete(`/board/${boardNo}`)
    navigate('/board')
  }

  if (!board) {
    return null
  }

  return (
    <div className="container">
      <div className="detail-header">
        <div className="detail-header-top">
          <h1>{board.title}</h1>
          <button className="btn-secondary" onClick={() => navigate('/board')}>목록으로</button>
        </div>
        <div className="detail-meta">
          <span>작성자: {board.writer}</span>
          <span>등록일: {board.regDt}</span>
           {board.updateDt && <span>수정일: {board.updateDt}</span>}
        </div>
      </div>

      <div className="detail-content">
        {board.content}
      </div>

      <div className="detail-actions">
          <button className="btn-primary" onClick={() => navigate(`/board/edit/${boardNo}`)}>수정</button>
          <button className="btn-danger" onClick={handleDelete}>삭제</button>
       </div>
    </div>
  )
}

export default BoardDetail