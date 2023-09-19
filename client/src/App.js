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
import AuthAdmin from "./components/authRoutes/admin";
import ForgotPassword from "./pages/auth/forgotPassword";
import AdminDashboard from "./pages/admin/dashboard";
import CreateCategory from "./pages/admin/createCategory";
import CreateProduct from "./pages/admin/createProduct";
import Users from "./pages/admin/users";
import Orders from "./pages/user/orders";
import Profile from "./pages/user/profile";
import Products from "./pages/admin/products";
import UpdateProduct from "./pages/admin/updateProduct";
import Search from "./pages/search";
import ProductDetails from "./pages/productDetails";
import Categories from "./pages/categories";
import CategoryProducts from "./pages/categoryProducts";
import CartPage from "./pages/cartPage";
import AdminOrders from "./pages/admin/adminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AuthUser />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AuthAdmin />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
