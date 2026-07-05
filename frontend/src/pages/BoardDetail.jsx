  import { useEffect, useState } from 'react'
  import { useParams, useNavigate } from 'react-router-dom'
  import api from '../api/axios'
  import '../styles/common.css'
  import './BoardDetail.css'

  function BoardDetail() {
    const { boardNo } = useParams()
    const [board, setBoard] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      api.get(`/board/${boardNo}`)
        .then(res => setBoard(res.data))
        .catch(err => console.error(err))
    }, [boardNo])

    if (!board) {
      return null
    }

    return (
      <div className="container">
        <div className="detail-header">
          <h1>{board.title}</h1>
          <div className="detail-meta">
            <span>{board.writer}</span>
            <span>{board.regDt}</span>
          </div>
        </div>

        <div className="detail-content">
          {board.content}
        </div>

        <div className="detail-actions">
          <button className="btn-secondary" onClick={() => navigate('/board')}>목록으로</button>
        </div>
      </div>
    )
  }

  export default BoardDetail