import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { MdFormatListBulletedAdd, MdShoppingCartCheckout, MdCategory } from "react-icons/md";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/features/auth/authSlice";
import { useLogoutMutation } from "../../Redux/api/userApiSlice";
import "./Navigation.css";
import FavoritesCount from "../products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"
        }xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15rem] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center">
        <Link to="/" className="flex relative mt-[1rem]" >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2" size={26} />
            <span className="hidden nav-item-name ">HOME</span>{" "}
          </div>
        </Link>
        <Link to="/shop" className="flex relative mt-[2rem]" >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2" size={26} />
            <span className="hidden nav-item-name ">SHOP</span>{" "}
          </div>
        </Link>

        <Link to="/cart" className="flex relative mt-[2rem]">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2" size={26} />
            <span className="hidden nav-item-name ">Cart</span>{" "}
          </div>

          <div className="absolute mt-[-10px] ml-[17px]">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative mt-[2rem]">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2 relative">
            <FaHeart className=" mr-2" size={20} />
            <span className="hidden nav-item-name ">Favorites</span><FavoritesCount />
          </div>
        </Link>
        <ul className={`mr-14 space-y-2 text-white-600 `}>
          {userInfo && userInfo.isAdmin && (
            <>
              <li>
                <Link to="/admin/allproductslist" className="flex relative mt-[2rem]">
                  <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                    <RxDashboard className="mr-2" size={25} />
                    <span className="hidden nav-item-name">                  All Products
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productlist"
                  className="flex relative mt-[2rem]"
                >
                  <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                    <MdFormatListBulletedAdd className="mr-2" size={28} />
                    <span className="hidden nav-item-name">Add Product</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categorylist"
                  className="flex relative mt-[2rem]"
                >
                  <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                    <MdCategory className="mr-2" size={28} />
                    <span className="hidden nav-item-name">Category</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/orderlist" className="flex relative mt-[2rem]">
                  <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                    <MdShoppingCartCheckout className="mr-2" size={28} />
                    <span className="hidden nav-item-name">Orders</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/userlist" className="flex relative mt-[2rem]">
                  <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                    <FiUsers className="mr-2" size={26} />
                    <span className="hidden nav-item-name">Users</span>
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="relative">
        <div className="flex items-center">
          {userInfo ? (
            <div>
              <Link to="/profile" className="flex relative mt-[3rem]">
                <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                  <FaRegUserCircle className="mr-2" size={25} />
                  <span className="text-white hidden nav-item-name">
                    {userInfo.username}
                  </span>
                </div>
              </Link>
              <button
                onClick={logoutHandler}
                className="flex justify-center items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogout className="mr-2 mt-5" size={26} />
                <span className="hidden nav-item-name mt-3"> Logout</span>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
              <span className="hidden nav-item-name">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="hidden nav-item-name">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
