'use client'

import { Product } from '@prisma/client';
import React from "react"
import ProductCard from './productCard';
import CategoryGrid from './categoryGrid';
import { Button } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function ProductsGrid() {
    const router = useRouter();
    const [products, setProducts] = React.useState([] as Product[]);
    const [category, setCategory] = React.useState("All");

    React.useEffect(() => {
        fetch(`/api/products?category=${category}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [category])

    return (
        <div className="flex flex-col flex-1 mt-4 mx-8 bg-heavy-background p-4">
            <h1 className="text-purple-600 text-2xl font-bold">Select Category</h1>
            <div className='flex flex-row-reverse'>
                <Button
                    onClick={() => router.push('/products/add')}
                    color="secondary"
                    className="bg-primary-color rounded-md my-2 py-1 px-2 mx-2"
                    variant="solid"
                  >
                    New Product
                    <IoAdd />
                  </Button>
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