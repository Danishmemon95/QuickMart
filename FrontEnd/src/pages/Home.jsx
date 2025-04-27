import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../Redux/api/productApiSlice"
import Loader from '@/components/Loader';
import Message from "@/components/Message";
import Header from "@/components/Header";
import Product from './products/Product';

const Home = () => {

    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {isError?.data.message || isError.error}
                </Message>
            ) : (
                <div className="mt-5">
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[15rem] mt-[2rem] text-[3rem] font-bold">
                            Special Products
                        </h1>

                        <Link
                            to="/shop"
                            className="bg-blue-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[2rem]"
                        >
                            Shop
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-center flex-wrap mt-[2rem]">
                            {data.products.map((product) => (
                                <div key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home