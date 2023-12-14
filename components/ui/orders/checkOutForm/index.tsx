'use client'

import React from 'react'
import { Order, Customer } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Quantity", uid: "quantity" },
    { name: "Size", uid: "size" },
    { name: "Toppings", uid: "toppings" }
];

export default function CheckOutForm({ params }: { params: { orderId: string } }) {

    const [order, setOrder] = React.useState<Order>();
    const [customer, setCustomer] = React.useState<Customer[]>([]);

    React.useEffect(() => {
        fetch(`/api/orders/${params.orderId}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, []);

    React.useEffect(() => {
        if (order) {
            var totalPrice = 0;
            order.items.forEach((item) => {
                totalPrice += item.price;
                item.toppings.forEach((topping) => {
                    totalPrice += topping.price;
                })
            })
            setOrder({
                ...order,
                totalPrice
            })
        }
    }, [order]);

    React.useEffect(() => {
        fetch(`/api/customers`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, []);

    const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const customerID = event.target.value;
        const customerName = customer.find((customer) => customer.id === customerID)?.name || "";
        setOrder({
            ...order as Order,
            customerID,
            customerName
        })
    }

    const handleSubmit = () => {
        fetch(`/api/orders/${params.orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div>
            <div>
                <h1>{order?.customerName}</h1>
                <select onChange={handleCustomerChange}>
                    {customer.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
                <h1>{order?.totalPrice}</h1>
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
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}