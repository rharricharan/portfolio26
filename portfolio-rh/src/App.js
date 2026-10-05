import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
