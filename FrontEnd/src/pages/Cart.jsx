import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../Redux/features/Cart/cartSlice"

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[7rem] h-[7rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-8">
                    <Link to={`/product/${item._id}`} className="text-blue-500 text-lg font-bold">
                      {item.name}
                    </Link>

                    <div className="mt-2 ">{item.brand}</div>
                    <div className="mt-2 font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="w-30">
                    <div className="flex items-center">
                      <select
                        className="w-[8rem] p-1 border rounded text-black"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        className="text-red-500"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-[1rem]" fontSize={"20px"} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 w-fit ">
                <div className="p-4 rounded-lg flex flex-col items-center ">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold mr-5">
                      Total Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) -
                    </h2>

                    <div className="text-2xl font-bold">
                      ${" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 mt-8 py-2 text-white px-5 rounded-full text-lg w-fit"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div >
    </>
  );
};

export default Cart;