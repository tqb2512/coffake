'use client'

import React from 'react'
import { Order } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';

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

    return (
        <div>
            <div>
                <h1>{order?.customerName}</h1>
            </div>
            {order && (
                <Table
                    aria-label='Orders Table'>
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {order?.items.map((item) => (
                            <TableRow key={item.productID}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>
                                    {item.toppings.map((topping, index) => (
                                        <p key={index}>{topping.productName} x {topping.quantity}</p>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}