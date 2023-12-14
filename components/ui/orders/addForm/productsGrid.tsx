'use client'

import { Product, Order } from '@prisma/client';
import React from "react"
import ProductCard from './productCard';
import CategoryGrid from './categoryGrid';

export default function ProductsGrid({order, setOrder}: {order: Order, setOrder: React.Dispatch<React.SetStateAction<Order>>}) {

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
            
            <CategoryGrid onPress={(category) => setCategory(category)} />
            <h1 className="text-purple-600 text-2xl font-bold">Product List</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} order={order} setOrder={setOrder} />
                ))}
            </div>
        </div>
    );
}