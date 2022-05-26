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
import { useState } from 'react';

function App() {
  const [userEmail, setUserEmail] = useState();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={(email) => { setUserEmail(email) }} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<Recommend email={userEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
