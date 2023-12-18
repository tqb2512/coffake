'use client'

import { Product } from '@prisma/client';
import React from "react"
import ProductCard from './productCard';
import CategoryGrid from './categoryGrid';
import { Button, Input } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

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
        <div className="flex flex-col flex-1 mt-4 mx-8 bg-heavy-background p-4 mb-16 rounded-lg">
            <h1 className="text-purple-600 text-2xl font-bold my-4">Select Category</h1>


            <CategoryGrid onPress={(category) => setCategory(category)} />
            <h1 className="text-purple-600 text-2xl font-bold mb-2">Product List</h1>
            <div className='flex justify-between mt-4 mb-4'>
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%] shadow-md rounded-md"
                    placeholder="Search by name..."
                    startContent={<FaSearch />}
                    // value={filterValue}
                    // onClear={() => onClear()}
                    // onValueChange={onSearchChange}
                />
                <Button
                    onClick={() => router.push('/products/add')}
                    color="secondary"
                    className="bg-primary-color rounded-md my-2 py-1 px-2 mx-2"
                    variant="solid"
                  >
                    New Product
                    <IoAdd />
                  </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 pb-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}