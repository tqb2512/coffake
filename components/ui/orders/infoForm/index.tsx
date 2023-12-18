'use client'

import React from 'react'
import { Order } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Divider,Input, Select, SelectItem } from '@nextui-org/react';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Quantity", uid: "quantity" },
    { name: "Size", uid: "size" },
    { name: "Toppings", uid: "toppings" }
];

export default function OrderInfoForm({ params }: { params: { orderId: string } }) {

    const [order, setOrder] = React.useState<Order>();

    React.useEffect(() => {
        fetch(`/api/orders/${params.orderId}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, []);

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

    return (
        <div>
            <label className="text-violet-800 text-3xl">
                {"Order's Details"}
               <Button className="float-right" onPress={handleCompleteOrder}>
                    Complete Order
               </Button>
            </label>
            <Divider className="my-4" />

            <div className="grid grid-cols-2 gap-6 mt-5 mb-10">
                <div className="flex flex-col gap-2">
                    <Input label="Date" value={order?.date.toString()} disabled/>
                    <Input label="Customer" value={order?.customerName} disabled/>
                </div>

                <div className="flex flex-col gap-2">
                    <Input label="Status" value={order?.status} disabled/>
                    <Input label="Total" value={order?.totalPrice.toString()} disabled/>
                </div>
            </div>

            <label className="text-violet-800 text-3xl">
                {"Order's Items"}
            </label>
            <Divider className="my-4" />
            {!order?.items.length ? <label className="text-black">
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </div>
    )
}