'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Customer, Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';

const columns = [
    { name: "Date", uid: "date", sortable: true },
    { name: "Total", uid: "total" },
    { name: "Status", uid: "status"},
    { name: "Actions", uid: "actions" }
];

export default function CustomerInfoForm({ params }: { params: { customerId: string } }) {

    const [customer, setCustomer] = React.useState<Customer>();
    const [orders, setOrders] = React.useState<Order[]>([]);

    useEffect(() => {
        fetch("/api/customers/" + params.customerId)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, []);

    useEffect(() => {
        fetch("/api/customers/" + params.customerId + "/getOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    return (
        <div>
            <h1>{customer?.name}</h1>
            <h2>{customer?.email}</h2>
            <h2>{customer?.phone}</h2>
            <Table
                aria-label='Orders Table'
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.date.toString()}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            <HiDotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link href={`/orders/${order.id}`}>
                                                View
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
