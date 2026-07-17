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
  const [editingCommentNo, setEditingCommentNo] = useState(null)
  const [editContent, setEditContent] = useState('')

  // 답글 관련 상태
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyWriter, setReplyWriter] = useState('')
  const [replyContent, setReplyContent] = useState('')

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

  // 댓글 목록(flat) -> 부모/자식 트리로 변환
  const commentTree = commentList
    .filter(c => !c.parentCommentNo)
    .map(parent => ({
      ...parent,
      replies: commentList.filter(c => c.parentCommentNo === parent.commentNo)
    }))
  
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

    // 댓글 삭제
    const handleCommentDelete = (commentNo) => {
      if (!window.confirm('댓글을 삭제하시겠습니까?')) return
      api.delete(`/board/${boardNo}/comment/${commentNo}`)
        .then(() => fetchCommentList())
        .catch(err => console.error(err))
    }

    // 댓글 수정 시작
      const handleCommentEditStart = (comment) => {
        setEditingCommentNo(comment.commentNo)
        setEditContent(comment.content)
      }

    // 댓글 수정 취소
      const handleCommentEditCancel = () => {
        setEditingCommentNo(null)
        setEditContent('')
      }

    // 댓글 수정 저장
      const handleCommentEditSubmit = (commentNo) => {
        if (!editContent.trim()) {
          alert('내용을 입력해주세요.')
          return
        }
        api.put(`/board/${boardNo}/comment/${commentNo}`, { content: editContent })
          .then(() => {
            setEditingCommentNo(null)
            setEditContent('')
            fetchCommentList()
          })
          .catch(err => console.error(err))
      }

    // 답글 작성 시작
    const handleReplyStart = (commentNo) => {
      setReplyingTo(commentNo)
      setReplyWriter('')
      setReplyContent('')
    }

    // 답글 작성 취소
    const handleReplyCancel = () => {
      setReplyingTo(null)
      setReplyWriter('')
      setReplyContent('')
    }

    // 답글 등록
    const handleReplySubmit = (parentCommentNo) => {
      if (!replyWriter.trim() || !replyContent.trim()) {
        alert('작성자와 내용을 입력해주세요.')
        return
      }
      api.post(`/board/${boardNo}/comment`, {
        writer: replyWriter,
        content: replyContent,
        parentCommentNo
      })
        .then(() => {
          handleReplyCancel()
          fetchCommentList()
        })
        .catch(err => console.error(err))
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
                {commentTree.length === 0 ? (
                  <li className="comment-empty">등록된 댓글이 없습니다.</li>
                ) : (
                  commentTree.map(comment => (
                    <li key={comment.commentNo} className="comment-item">
                      <div className="comment-meta">
                        <span className="comment-writer">{comment.writer}</span>
                        <span className="comment-date">{comment.regDt}</span>
                        {comment.updateDt && <span className="comment-date">(수정됨 {comment.updateDt})</span>}
                        {editingCommentNo !== comment.commentNo && (
                          <>
                            <button
                              className="comment-reply-btn"
                              onClick={() => handleReplyStart(comment.commentNo)}
                            >
                              답글
                            </button>
                            <button
                              className="comment-edit-btn"
                              onClick={() => handleCommentEditStart(comment)}
                            >
                              수정
                            </button>
                            <button
                              className="comment-delete-btn"
                              onClick={() => handleCommentDelete(comment.commentNo)}
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                      {editingCommentNo === comment.commentNo ? (
                        <div className="comment-edit-form">
                          <textarea
                            className="comment-content-input"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                          />
                          <div className="comment-edit-actions">
                            <button className="btn-secondary" onClick={handleCommentEditCancel}>취소</button>
                            <button className="btn-primary" onClick={() => handleCommentEditSubmit(comment.commentNo)}>저장</button>
                          </div>
                        </div>
                      ) : (
                        <div className="comment-content">{comment.content}</div>
                      )}

                      {replyingTo === comment.commentNo && (
                        <div className="comment-reply-form">
                          <input
                            type="text"
                            className="comment-writer-input"
                            placeholder="작성자"
                            value={replyWriter}
                            onChange={(e) => setReplyWriter(e.target.value)}
                          />
                          <textarea
                            className="comment-content-input"
                            placeholder="답글을 입력하세요"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          />
                          <div className="comment-edit-actions">
                            <button className="btn-secondary" onClick={handleReplyCancel}>취소</button>
                            <button className="btn-primary" onClick={() => handleReplySubmit(comment.commentNo)}>등록</button>
                          </div>
                        </div>
                      )}

                      {comment.replies.length > 0 && (
                        <ul className="comment-replies">
                          {comment.replies.map(reply => (
                            <li key={reply.commentNo} className="comment-item comment-reply">
                              <div className="comment-meta">
                                <span className="comment-writer">{reply.writer}</span>
                                <span className="comment-date">{reply.regDt}</span>
                                {reply.updateDt && <span className="comment-date">(수정됨 {reply.updateDt})</span>}
                                {editingCommentNo !== reply.commentNo && (
                                  <>
                                    <button
                                      className="comment-edit-btn"
                                      onClick={() => handleCommentEditStart(reply)}
                                    >
                                      수정
                                    </button>
                                    <button
                                      className="comment-delete-btn"
                                      onClick={() => handleCommentDelete(reply.commentNo)}
                                    >
                                      삭제
                                    </button>
                                  </>
                                )}
                              </div>
                              {editingCommentNo === reply.commentNo ? (
                                <div className="comment-edit-form">
                                  <textarea
                                    className="comment-content-input"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                  />
                                  <div className="comment-edit-actions">
                                    <button className="btn-secondary" onClick={handleCommentEditCancel}>취소</button>
                                    <button className="btn-primary" onClick={() => handleCommentEditSubmit(reply.commentNo)}>저장</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="comment-content">{reply.content}</div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
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