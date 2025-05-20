import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Admin from './pages/admin';
import LoginModal from './pages/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/test" element={<LoginModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
