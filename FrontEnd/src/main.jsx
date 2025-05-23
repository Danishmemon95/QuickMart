import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import "./index.css";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Users/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shipping from "./pages/order/Shipping.jsx";
import PlaceOrder from "./pages/order/PlaceOrder.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/order/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Shop" element={<Shop />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/Order/:id" element={<Order />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="OrderList" element={<OrderList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);