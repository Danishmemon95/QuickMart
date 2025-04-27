import React from 'react'
import { useGetTopProductsQuery } from "../Redux/api/productApiSlice";
import Loader from './Loader';
import SmallProduct from '@/pages/products/SmallProduct';
import ProductCarousel from '@/pages/products/ProductCarousel';
import logo from "../components/logo.png"
// import logo2 from "../../src/QuickMart.PNG"

const Header = () => {

    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return null;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <>
            <div>
                <img src={logo} alt="" className='w-[15rem] h-[7rem] ml-[5rem] top-0 absolute' />
            </div>
            <div className='ml-[15rem] mt-[5rem]'>
                <p className='font-bold ml-[2rem] text-[3rem]  mt-[1rem]'>Top Products</p>
                <div className="flex justify-between">
                    <div className="xl:block lg:hidden md:hidden sm:hidden w-[70%]">
                        <div className="grid grid-cols-2 w-[50rem] mt-[3rem]">
                            {data.map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <ProductCarousel />
                </div>
            </div>
        </>
    );
}

export default Header