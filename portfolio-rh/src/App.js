import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectNav from './Components/ProjectNav';
import Home from './Pages/Home';
import Smartstop from './Pages/Projects/Smartstop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route element={<ProjectNav />}>
          <Route path="/smartstop" element={<Smartstop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
