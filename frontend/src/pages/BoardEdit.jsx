 import { useState, useEffect } from 'react'
  import { useParams, useNavigate } from 'react-router-dom'
  import api from '../api/axios'
  import '../styles/common.css'
  import './BoardWrite.css'

  function BoardEdit() {
    const { boardNo } = useParams()
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      api.get(`/board/${boardNo}`)
        .then(res => {
          setTitle(res.data.title)
          setWriter(res.data.writer)
          setContent(res.data.content)
        })
        .catch(err => console.error(err))
    }, [boardNo])

    const handleSave = () => {
      if (!title.trim() || !writer.trim()) {
        alert('제목과 작성자를 입력해주세요.')
        return
      }

      api.put(`/board/${boardNo}`, { title, writer, content })
        .then(() => navigate(`/board/${boardNo}`))
        .catch(err => console.error(err))
    }

    return (
      <div className="container">
        <div className="write-header">
          <h1>글수정</h1>
        </div>

        <div className="write-form">
          <div className="form-row">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>작성자</label>
            <input
              type="text"
              value={writer}
              onChange={e => setWriter(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>내용</label>
            <textarea
              rows="12"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="write-actions">
          <button className="btn-secondary" onClick={() => navigate(`/board/${boardNo}`)}>취소</button>
          <button className="btn-primary" onClick={handleSave}>저장</button>
        </div>
      </div>
    )
  }

  export default BoardEdit