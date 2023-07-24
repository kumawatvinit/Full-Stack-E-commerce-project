import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import About from "./pages/about";
import Contact from "./pages/contact";
import Policy from "./pages/policy";
import PageNotFound from "./pages/pageNotFound";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/user/dashboard";
import AuthUser from "./components/authRoutes/user";
import AuthAdmin from './components/authRoutes/admin';
import ForgotPassword from "./pages/auth/forgotPassword";
import AdminDashboard from './pages/admin/dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AuthUser />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AuthAdmin />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
