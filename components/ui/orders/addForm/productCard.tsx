'use client'

import { Order, Product, OrderItems } from "@prisma/client"
import AddProductModal from "./addProductModal"
import React from "react"

export default function ProductCard({ product, order, setOrder }: { product: Product, order: Order, setOrder: React.Dispatch<React.SetStateAction<Order>> }) {

    const [selectedSize, setSelectedSize] = React.useState("")
    const [selectedPrice, setSelectedPrice] = React.useState(0)
    const [orderItem, setOrderItem] = React.useState({} as OrderItems)
    const [isOpen, setIsOpen] = React.useState(false)

    const handleAddToOrder = () => {
        setOrderItem({
            productID: product.id,
            productName: product.name,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1,
            toppings: [],
            note: ""
        })
        setIsOpen(true)
    }

    return (
        <div>
            <h1>{product.name}</h1>
            {product.sizeList.map(sizeInfo => (
                <div key={sizeInfo.size}>
                    <input type="radio" name="size" value={sizeInfo.size} onChange={(e) => {setSelectedSize(e.target.value), setSelectedPrice(sizeInfo.price)}} />
                    <label htmlFor={sizeInfo.size}>{sizeInfo.size}</label>
                </div>
            ))}
            <h1>{selectedPrice}</h1>
            <button onClick={handleAddToOrder}>Add to order</button>
            {isOpen && <AddProductModal order={order} setOrder={setOrder} orderItem={orderItem} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    )
}