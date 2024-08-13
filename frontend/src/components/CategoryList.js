import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();

            // Ensure that dataResponse.data is an array or set it to an empty array if it's undefined
            setCategoryProduct(Array.isArray(dataResponse.data) ? dataResponse.data : []);
        } catch (error) {
            console.error("Failed to fetch category products:", error);
            setCategoryProduct([]); // Set an empty array on error to prevent map errors
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto py-5 px-8'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link
                            to={"/product-category?category=" + product?.category}
                            className='cursor-pointer'
                            key={product?.category || product?._id} // Use a unique key if possible
                        >
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.productName || 'Product Image'} // More descriptive alt text
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>
                                {product?.category}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
