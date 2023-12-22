'use client'

import { Order, Product } from "@prisma/client"
import React from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, CardFooter, Checkbox, CheckboxGroup, RadioGroup, Radio } from "@nextui-org/react"
import ProductCard from "./productCard"

const categoryList = [
    "All",
    "Drink",
    "Food",
    "Topping"
]

export default function OrderAddForm() {

    const router = useRouter()
    const [products, setProducts] = React.useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = React.useState({} as Product)
    const [category, setCategory] = React.useState("All")
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
        fetch('/api/products?category=' + category)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [category])

    const handleSubmit = () => {
        if (order.totalPrice == 0) {
            alert("Please add at least one item to the order")
            return
        } else {
            fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => router.push(`/orders/add/${data.id}`))
        }
    }

    return (
        <div className="flex flex-row flex-1 mb-8 h-fit">
            <div className="flex flex-col w-3/5 mt-4 mx-8 bg-white p-4 rounded-lg">
                <h1 className="text-purple-600 text-2xl font-bold mb-4">
                    Select Category
                </h1>

                <div className="flex flex-row gap-2 my-5">
                    {categoryList.map((category) => (
                        <Button
                            {...(category === category ? { className: 'text-white bg-violet-800' } : {})}
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-row gap-2 my-5">
                    <div className="grid grid-cols-3 gap-6 mt-5 mb-10">
                        {products.map((product) => (
                            <ProductCard
                                product={product}
                                order={order}
                                setOrder={setOrder}
                            />
                        ))} 
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-2/5 mt-4 ms-2 me-8 bg-white p-4 h-fit rounded-lg">
                <h1 className="text-2xl font-bold">Order Information</h1>

                <Table>
                    <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Product</TableColumn>
                        <TableColumn>Size</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {order.items?.map((item, index) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>{
                                    item.price + item.toppings?.reduce((total, topping) => total + topping.price, 0)
                                }</TableCell>
                                <TableCell className="w-10">
                                    <Button onPress={() => {
                                        setOrder(prevOrder => ({
                                            ...prevOrder,
                                            totalPrice: prevOrder.totalPrice - item.price - item.toppings?.reduce((total, topping) => total + topping.price, 0),
                                            items: prevOrder.items?.filter((_, i) => i !== index)
                                        }))
                                    }}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex flex-col border border-purple-600 mt-4 p-4 rounded-md">
                    
                    <div className="flex justify-between">
                        <h2 className="font-bold">Subtotal</h2>
                        <h2 className="font-bold">
                            ${order.totalPrice}
                        </h2>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-purple-600 rounded-md bottom-0 mt-2 py-1"
                    >
                        <h3 className="text-white font-semibold py-1">
                            Continue to Checkout
                        </h3>
                    </button>
                </div>
            </div>
        </div>
    )
}