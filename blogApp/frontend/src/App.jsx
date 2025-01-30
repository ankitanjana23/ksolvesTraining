import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Blog from './components/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App;
