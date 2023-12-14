'use client'

import { Order, Product } from "@prisma/client"
import CategoryGrid from "./categoryGrid"
import ProductGrid from "./productsGrid"
import React from "react"
import { useRouter } from "next/navigation"

export default function OrderAddForm() {

    const router = useRouter()
    const [products, setProducts] = React.useState<Product[]>([])
    const [order, setOrder] = React.useState<Order>(
        {
            date: new Date(),
            customerName: "No account",
            customerID: "657b3eb54760b545e3d830a6",
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                router.push(`/orders/add/${data.id}`)
            })
    }

    return (
        <div>
            <ProductGrid order={order} setOrder={setOrder} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}