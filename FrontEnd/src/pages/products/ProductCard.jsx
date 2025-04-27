import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/cartSlice";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        const newProduct = { ...product, qty };
        dispatch(addToCart(newProduct));
        toast.success("Item added successfully");
    };


    return (
        <div className="max-w-sm relative  rounded-lg shaodw bg-gray-800">
            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full"
                        src={p.image}
                        alt={p.name}
                        style={{ height: "220px", objectFit: "cover" }}
                    />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-5 h-[200px]">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-white ">{p?.name}</h5>

                    <p className="text-white ml-2 font-semibold">
                        {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                </div>

                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex justify-between items-center">
                    <Link
                        to={`/product/${p._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read More
                        <FaArrowRightLong fontSize={"18px"} className="ml-2" />
                    </Link>

                    <button
                        className="p-2 rounded-full cursor-pointer"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShoppingCart size={25} className="text-white" />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;