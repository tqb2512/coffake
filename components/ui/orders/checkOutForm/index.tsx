'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { Order, Customer } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Textarea, RadioGroup, Radio, Select, SelectItem, Button, Divider, Input } from '@nextui-org/react';
import SelectCustomerModal from './selectCustomerModal';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Quantity", uid: "quantity" },
    { name: "Size", uid: "size" },
    { name: "Toppings", uid: "toppings" },
    { name: "Price", uid: "price" },
];

const statusList = [
    "Pending",
    "Confirmed"
]

export default function CheckOutForm({ params }: { params: { orderId: string } }) {

    const router = useRouter();
    const [order, setOrder] = React.useState<Order>({} as Order);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        fetch(`/api/orders/${params.orderId}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [params.orderId]);

    const handleSubmit = () => {
        fetch(`/api/orders/${params.orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => router.push('/orders/add'))
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    }

    return (
        <div>
            <label className="text-violet-800 text-3xl">
                {"Order checkout"}
            </label>
            <Divider className="my-4" />

            <div className="flex flex-row gap-4 my-5">
                <div className="flex flex-col w-1/2">
                    <Input label="Customer Name" value={order?.customerName} disabled />
                </div>
                <div className="flex flex-col w-1/2">
                    <Button className="float-right h-full" onPress={() => setIsOpen(!isOpen)}>Select Customer</Button>
                </div>
            </div>

            <SelectCustomerModal isOpen={isOpen} setIsOpen={setIsOpen} order={order} />

            <label className="text-violet-800 text-3xl">
                {"Order Infomation"}
            </label>
            <Divider className="my-4" />

            <div className="flex flex-row gap-4 my-5">
                <div className="flex flex-col w-1/2">
                    <Input label="Date" value={formatDate(order?.date?.toString())} disabled />
                </div>
                <div className="flex flex-col w-1/2">
                    <Select label="Status" value={order?.status} onChange={(e) => setOrder({ ...order as Order, status: e.target.value })}>
                        <SelectItem key="Pending" value="Pending">Pending</SelectItem>
                        <SelectItem key="Confirmed" value="Confirmed">Confirmed</SelectItem>
                    </Select>
                </div>
            </div>
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {order?.items?.map((item) => (
                        <TableRow key={item.productID}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.toppings?.map((topping) => topping.productName).join(", ")}</TableCell>
                            <TableCell>$ {item.price + item.toppings?.reduce((total, topping) => total + topping.price, 0)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex flex-row gap-4 my-5">
                <div className="flex flex-col w-1/2">
                    <Input label="Total Price" value={order?.totalPrice?.toString()} disabled endContent="$" />
                </div>
                <div className="flex flex-col w-1/2">
                    <Button className="float-right h-full" color="primary" onPress={handleSubmit}>Submit</Button>
                </div>
            </div>

        </div>
    )
}