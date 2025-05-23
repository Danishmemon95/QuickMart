import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../../Redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../Redux/features/Cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <div className="font-semibold text-2xl flex items-center hover:underline ml-[10rem] mt-[1rem]">
                <MdKeyboardBackspace className="mr-5" />
                <Link
                    to="/"
                >
                    Go Back
                </Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full xl:w-[45rem] lg:w-[40rem] md:w-[25rem] sm:w-[20rem] mr-[2rem]"
                            />

                            <HeartIcon product={product} />
                        </div>

                        <div className="flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                                {product.description}
                            </p>

                            <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

                            <div className="flex items-center justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2 " /> Brand:{" "}
                                        {product.brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[20rem]">
                                        <FaClock className="mr-2 " /> Added:{" "}
                                        {moment(product.createAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className="mr-2 " /> Reviews:{" "}
                                        {product.numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className="mr-2 " /> Ratings: {product.rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaBox className="mr-2" /> In Stock:{" "}
                                        {product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between items-center flex-wrap">
                                <Ratings
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />

                                {product.countInStock > 0 && (
                                    <div> <span className="font-mediumt- text-lg">Quantity: {" "}</span>
                                        <input
                                            type="number"
                                            value={qty}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                if (value > 0 && value <= product.countInStock) {
                                                    setQty(value);
                                                }
                                            }}
                                            min="1"
                                            max={product.countInStock}
                                            className="p-2 w-[6rem] rounded-lg text-black "
                                        />
                                    </div>

                                )}
                            </div>

                            <div className="btn-container">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-[2rem] container flex flex-col items-start justify-between ml-[1rem]">
                            <ProductTabs
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;