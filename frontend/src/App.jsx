  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home'
  import BoardList from './pages/BoardList'
  import BoardDetail from './pages/BoardDetail'
  import BoardWrite from './pages/BoardWrite'
  import BoardEdit from './pages/BoardEdit'

  function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:boardNo" element={<BoardDetail />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/edit/:boardNo" element={<BoardEdit />} />
      </Routes>
    )
  }

  export default App
