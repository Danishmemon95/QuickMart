import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../Redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../Redux/api/categoryApiSlice";

import {
    setCategories,
    setProducts,
    setChecked,
} from "../Redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./products/ProductCard";

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(
        (state) => state.shop
    );

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                const filteredProducts = filteredProductsQuery.data.filter(
                    (product) => {
                        return (
                            product.price.toString().includes(priceFilter) ||
                            product.price === parseInt(priceFilter, 10)
                        );
                    }
                );

                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    const uniqueBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value);
    };

    return (
        <>
            <div className="container ml-[4.5rem]">
                <div className="flex md:flex-row">
                    <div className="p-3 shadow-[0_5px_10px_rgba(0,0,0,0.25)] ">
                        <h2 className="h4 text-center py-2 text-lg font-bold">
                            Filter by Categories
                        </h2>

                        <div className="p-5 w-[15rem]">
                            {categories?.map((c) => (
                                <div key={c._id} className="mb-2">
                                    <div className="flex items-center mb-3">
                                        <input
                                            type="checkbox"
                                            id="red-checkbox"
                                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                                        />

                                        <label
                                            htmlFor="blue-checkbox"
                                            className="ml-3 text-md font-medium"
                                        >
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 font-bold text-lg">
                            Filter by Brands
                        </h2>

                        <div className="p-5">
                            {uniqueBrands?.map((brand) => (
                                <>
                                    <div className="flex items-center mr-4 mb-5">
                                        <input
                                            type="radio"
                                            id={brand}
                                            name="brand"
                                            onChange={() => handleBrandClick(brand)}
                                            className="w-4 h-4"
                                        />

                                        <label
                                            htmlFor="blue-radio"
                                            className="ml-2 text-md font-medium"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                                </>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 font-bold text-lg ">
                            Filer by Price
                        </h2>

                        <div className="p-5 w-[15rem]">
                            <input
                                type="text"
                                placeholder="Enter Price"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full px-3 py-2  border rounded-lg focus:outline-none"
                            />
                        </div>

                        <div className="p-5 pt-0">
                            <button
                                className="w-full border my-4 py-2 bg-black text-white font-bold cursor-pointer rounded-lg"
                                onClick={() => window.location.reload()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                products?.map((p) => (
                                    <div className="p-3" key={p._id}>
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;