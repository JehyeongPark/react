import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="container home-container">
      <h1 className="home-title">환영합니다</h1>
      <p className="home-desc">게시판 이용을 위해선 로그인이 필요합니다.</p>
      <div className="home-actions">
        <button className="btn-primary enter-btn" onClick={() => navigate('/login')}>로그인</button>
        <button className="btn-secondary enter-btn" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  )
}

export default Home