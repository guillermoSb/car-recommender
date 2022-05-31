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
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) setUserEmail(email); // set the user email

  }, [])
  const [userEmail, setUserEmail] = useState();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={(email) => {
          localStorage.setItem('email', email);
          setUserEmail(email)
        }} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<Recommend email={userEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
