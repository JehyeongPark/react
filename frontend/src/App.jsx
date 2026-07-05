  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home'
  import BoardList from './pages/BoardList'
  import BoardDetail from './pages/BoardDetail'

  function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:boardNo" element={<BoardDetail />} />
      </Routes>
    )
  }

  export default App
