'use client'

import { Order, Product, OrderItems } from "@prisma/client"
import React from "react"

export default function AddProductModal({ order, setOrder, orderItem, isOpen, setIsOpen }: { order: Order, setOrder: React.Dispatch<React.SetStateAction<Order>>, orderItem: OrderItems, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [products, setProducts] = React.useState<Product[]>([])
    const [selectedToppings, setSelectedToppings] = React.useState([] as Product[])
    const [item, setItem] = React.useState(orderItem)

    React.useEffect(() => {
        fetch(`/api/products?category=Topping`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [])

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const handleSubmit = () => {
        toggleModal()
        
        selectedToppings.forEach((topping) => {
            item.toppings.push({
                productID: topping.id,
                productName: topping.name,
                size: topping.sizeList[0].size,
                price: topping.sizeList[0].price,
                quantity: 1,
            })
        })

        setOrder(prevOrder => ({
            ...prevOrder,
            items: [...prevOrder.items || [], item]
        }))
    }

    return (
        <div>
            {isOpen && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={toggleModal}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                            </button>
                        </div>
                        <div>
                            <h1 className="text-purple-600 text-2xl font-bold">Select Toppings</h1>
                            {products.map((product) => (
                                <div key={product.id}>
                                    <input type="checkbox" name="topping" value={product.name} onChange={(e) => {setSelectedToppings([...selectedToppings, product])}} />
                                    <label htmlFor={product.name}>{product.name}</label>
                                </div>
                            ))}
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}