 import { useNavigate } from 'react-router-dom'
  import '../styles/common.css'
  import './Home.css'

  function Home() {
    const navigate = useNavigate()

    return (
      <div className="container home-container">
        <h1 className="home-title">환영합니다</h1>
        <p className="home-desc">아래 버튼을 눌러 게시판으로 이동하세요.</p>
        <button className="btn-primary enter-btn" onClick={() => navigate('/board')}>게시판 입장</button>
      </div>
    )
  }

  export default Home