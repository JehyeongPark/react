import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/common.css'
import './BoardDetail.css'

function BoardDetail() {
  const { boardNo } = useParams()
  const [board, setBoard] = useState(null)
  const [commentList, setCommentList] = useState([])
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  // 상세
  useEffect(() => {
    api.get(`/board/${boardNo}`)
      .then(res => setBoard(res.data))
      .catch(err => console.error(err))
  }, [boardNo])

  // 댓글 목록
    const fetchCommentList = () => {
      api.get(`/board/${boardNo}/comment`)
        .then(res => setCommentList(res.data))
        .catch(err => console.error(err))
    }
  
    useEffect(() => {
      fetchCommentList()
    }, [boardNo])
  
   // 댓글 등록
   const handleCommentSubmit = () => {
     if (!writer.trim() || !content.trim()) {
       alert('작성자와 내용을 입력해주세요.')
       return
     }
     api.post(`/board/${boardNo}/comment`, { writer, content })
       .then(() => {
         setContent('')
         fetchCommentList()
       })
       .catch(err => console.error(err))
  }

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
        <div className="comment-section">
          <h2 className="comment-title">댓글 {commentList.length}</h2>
  
          <ul className="comment-list">
            {commentList.length === 0 ? (
              <li className="comment-empty">등록된 댓글이 없습니다.</li>
            ) : (
              commentList.map(comment => (
                <li key={comment.commentNo} className="comment-item">
                  <div className="comment-meta">
                    <span className="comment-writer">{comment.writer}</span>
                    <span className="comment-date">{comment.regDt}</span>
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </li>
              ))
            )}
          </ul>
  
          <div className="comment-form">
            <input
              type="text"
              className="comment-writer-input"
              placeholder="작성자"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
            <textarea
              className="comment-content-input"
              placeholder="댓글을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn-primary comment-submit-btn" onClick={handleCommentSubmit}>등록</button>
          </div>
        </div>
    </div>
  )
}

export default BoardDetail