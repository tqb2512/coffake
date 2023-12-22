'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Divider, Input } from '@nextui-org/react';
import { Customer, Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const columns = [
    { name: "Date", uid: "date", sortable: true },
    { name: "Total", uid: "total" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" }
];

export default function CustomerInfoForm({ params }: { params: { customerId: string } }) {

    const router = useRouter();
    const { data: session, status } = useSession()
    const [customer, setCustomer] = React.useState<Customer>();
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [isEditing, setIsEditing] = React.useState(false);

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

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    }

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        router.push("/login")
    }

    return (
        <div className='bg-white p-4  rounded-lg'>
            <div>
                <label className="text-violet-800 text-3xl">
                    {"Customer's Details"}
                    <Button onClick={handleEditClick} className="float-right">
                        {isEditing ? "Apply" : "Edit"}
                    </Button>
                </label>
                <Divider className="my-4" />

                <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
                    <Input label="Name" value={customer?.name} disabled={!isEditing} />
                    <Input label="Phone" value={customer?.phone} disabled={!isEditing} />
                    <Input label="Email" value={customer?.email} disabled={!isEditing} />
                    <Input label="Loyalty Points" value={customer?.loyaltyPoints.toString()} disabled={!isEditing} />
                </div>

                <label className="text-violet-800 text-3xl">
                    {"Customer's Orders"}
                </label>
                <Divider className="my-4" />
                {!orders.length ? <label className="text-black">
                    {"No order found"}
                </label> :
                    <Table aria-label="Orders">
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
                                    <TableCell>{formatDate(order.date.toString())}</TableCell>
                                    <TableCell>$ {order.totalPrice.toString()}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell className='w-10'>
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
                    </Table>}
            </div>
        </div>
    )
}
