'use client'

import { Product } from '@prisma/client';
import React from "react"
import ProductCard from './productCard';
import CategoryGrid from './categoryGrid';

export default function ProductsGrid() {

    const [products, setProducts] = React.useState([] as Product[]);
    const [category, setCategory] = React.useState("");

    React.useEffect(() => {
        fetch(`/api/products?category=${category}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [category])

    return (
        <div className="flex flex-col flex-1 mt-4 mx-8 bg-heavy-background p-4">
            <h1 className="text-purple-600 text-2xl font-bold">Select Category</h1>
            <div className='flex flex-row-reverse'>
                <button className=" bg-primary-color rounded-md my-2 py-1 px-2 mx-2">
                    <h3 className="text-white font-semibold py-1">New Product +</h3>
                </button>
                <button className=" bg-primary-color rounded-md my-2 py-1 px-2">
                    <h3 className="text-white font-semibold py-1">Filter</h3>
                </button>
            </div>

            <CategoryGrid onPress={(category) => setCategory(category)} />
            <h1 className="text-purple-600 text-2xl font-bold">Product List</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}