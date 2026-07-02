  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home'
  import BoardList from './pages/BoardList'

  function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardList />} />
      </Routes>
    )
  }

  export default App