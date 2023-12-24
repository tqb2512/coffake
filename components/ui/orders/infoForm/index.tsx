'use client'

import React from 'react'
import { Order } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Quantity", uid: "quantity" },
    { name: "Size", uid: "size" },
    { name: "Toppings", uid: "toppings" },
    { name: "Price", uid: "price" },
];

export default function OrderInfoForm({ params }: { params: { orderId: string } }) {

    const [order, setOrder] = React.useState<Order>({} as Order);

    React.useEffect(() => {
        fetch(`/api/orders/${params.orderId}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [params.orderId]);

    const handleCompleteOrder = () => {
        fetch(`/api/orders/${params.orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Completed" }),
        })
            .then((res) => res.json())
            .then((data) => setOrder(data));
    };

    const handleCancelOrder = () => {
        fetch(`/api/orders/${params.orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Cancelled" }),
        })
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    }

    return (
        <div>
            <label className="text-violet-800 text-3xl">
                {"Order's Details"}
                {order?.status === "Confirmed" && (
                    <div className="float-right">
                        <Button className="mr-3" color="danger" onPress={handleCancelOrder}>Cancel Order</Button>
                        <Button className="mr-5" color="success" onClick={handleCompleteOrder}>Complete Order</Button>
                    </div>
                )}
            </label>
            <Divider className="my-4" />
            <div className="grid grid-cols-2 gap-6 mt-5 mb-10">
                <div className="flex flex-col gap-2">
                    <Input label="Date" value={formatDate(order.date?.toString())} disabled />
                    <Input label="Customer" value={order?.customerName} disabled />
                </div>

                <div className="flex flex-col gap-2">
                    <Input label="Status" value={order?.status} disabled />
                    <Input label="Total" value={order?.totalPrice?.toString()} disabled endContent="$" />
                </div>
            </div>

            <label className="text-violet-800 text-3xl">
                {"Order's Items"}
            </label>
            <Divider className="my-4" />
            {!order?.items?.length ? <label className="text-black">
                {"No item found"}
            </label> :
                <Table aria-label="Items">
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.productID}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>{item.toppings.map((topping) => topping.productName).join(", ")}</TableCell>
                                <TableCell>$ {item.price + item.toppings?.reduce((total, topping) => total + topping.price, 0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </div>
    )
}