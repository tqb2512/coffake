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
        <div>
            <CategoryGrid onPress={(category) => setCategory(category)} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}