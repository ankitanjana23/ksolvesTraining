import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import CreateBlog from './pages/CreateBlog';
import { isAdmin } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute'
import BlogComment from './pages/BlogComment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<SignupForm />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blogs/:blogId" element={<BlogComment />} />
          {isAdmin() && <Route path="/admin" element={<Admin />} />}
        </Route>

      </Routes>
    </Router>
  )
}

export default App;
