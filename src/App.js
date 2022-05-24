import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Recommend from './pages/Recommend';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </Router>
  );
}

export default App;
