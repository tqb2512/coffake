'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';

const columns = [
    { name: "Date", uid: "date", sortable: true },
    { name: "Customer", uid: "customer"},
    { name: "Total", uid: "total" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" }
];

const statuses = [
    "All",
    "Pending",
    "Processing",
    "Completed",
    "Cancelled"
]


export default function OrdersTable() {

    const [orders, setOrders] = React.useState<Order[]>([]);
    const [status, setStatus] = React.useState<string>("All");

    useEffect(() => {
        fetch("/api/orders?status=" + status)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [status]);

    useEffect(() => {
        fetch("/api/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    return (
        <div>

            <Dropdown>
                <DropdownTrigger>
                    <Button>
                        Filter
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {statuses.map((status) => (
                        <DropdownItem key={status} onClick={() => setStatus(status)}>
                            {status}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
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
                            <TableCell>{order.customerName}</TableCell>
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
                                            View
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