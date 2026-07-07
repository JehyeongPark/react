  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import api from '../api/axios'
  import '../styles/common.css'
  import './BoardWrite.css'

  function BoardWrite() {
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const handleSave = () => {
      if (!title.trim() || !writer.trim()) {
        alert('제목과 작성자를 입력해주세요.')
        return
      }

      api.post('/board', { title, writer, content })
        .then(() => navigate('/board'))
        .catch(err => console.error(err))
    }

    return (
      <div className="container">
        <div className="write-header">
          <h1>글쓰기</h1>
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
          <button className="btn-secondary" onClick={() => navigate('/board')}>취소</button>
          <button className="btn-primary" onClick={handleSave}>저장</button>
        </div>
      </div>
    )
  }

  export default BoardWrite