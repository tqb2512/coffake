'use client'

import { Order, Product } from "@prisma/client"
import CategoryGrid from "./categoryGrid"
import ProductGrid from "./productsGrid"
import React from "react"

export default function OrderAddForm() {

    const [products, setProducts] = React.useState<Product[]>([])
    const [order, setOrder] = React.useState<Order>(
        { 
            date: new Date(),
            totalPrice: 0,
            status: "Pending", 
        } as Order
    )

    React.useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleSubmit = () => {
        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(order)
        })
    }

    return (
        <div>
            <ProductGrid order={order} setOrder={setOrder} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}