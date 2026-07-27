import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/common.css'
import './BoardWrite.css'

  function Signup() {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleSignup = () => {
      if (!userId.trim() || !password.trim() || !userName.trim()) {
        alert('아이디, 비밀번호, 이름을 모두 입력해주세요.')
        return
      }

      api.post('/auth/signup', { userId, password, userName })
        .then(() => {
          alert('회원가입이 완료되었습니다.')
          navigate('/login')
        })
        .catch(err => console.error(err))
    }

    return (
      <div className="container">
        <div className="write-header">
          <h1>회원가입</h1>
        </div>

        <div className="write-form">
          <div className="form-row">
            <label>아이디</label>
            <input
              type="text"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>이름</label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>


        </div>

        <div className="write-actions">
          <button className="btn-secondary" onClick={() => navigate('/')}>취소</button>
          <button className="btn-primary" onClick={handleSignup}>가입하기</button>
        </div>
      </div>
    )
  }

  export default Signup