'use client'

import React from 'react'
import { Order, Customer } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Textarea, RadioGroup, Radio, Select, SelectItem, Button } from '@nextui-org/react';

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
        <div className='p-4 bg-white h-full'>
            <h1 className='font-bold text-3xl text-purple-600'>Checkout</h1>
            <div>
                <h1>{order?.customerName}</h1>
                <Select 
                    className='w-1/3 p-4'
                    onChange={handleCustomerChange}
                    label="Customer"
                    placeholder='Select Customer'
                    selectionMode='single'>
                    {customer.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {order && (
                <Table
                    className='px-4'
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

            <div className='flex w-full mt-8 p-4'>
                <div className='flex flex-col w-2/3'>
                    <label className='font-semibold'>Notes</label>          
                    <Textarea
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-xs mb-4"
                    />     
                    <label className='font-semibold'>Status</label>          
                    <RadioGroup
                        orientation="horizontal"
                        defaultValue="pending"
                    >
                        <Radio value="served">Served</Radio>
                        <Radio value="pending">Pending</Radio>
                        <Radio value="debt">In Debt</Radio>
                    </RadioGroup>
                </div>
                <div className='flex flex-col w-1/3 bg-[#F0F0F0] rounded-md pt-4'>
                    <div className="flex justify-between p-2 px-4">
                        <h2>Subtotal</h2>
                        <h2>1 USD</h2>
                    </div>
                    <div className="flex justify-between p-2 px-4">
                        <h2>Discount</h2>
                        <h2>1 USD</h2>
                    </div>
                    <div className="flex justify-between p-2 px-4">
                        <h2 className="font-bold text-lg text-purple-600">Total</h2>
                        <h2 className="font-bold text-lg text-purple-600">{order?.totalPrice} USD</h2>
                    </div>
                </div>
            </div>
            
            <div>
                <div className="col-span-2 flex justify-end gap-x-6 my-6 p-4">
                  <Button
                    color="default"
                    className="text-neutral-500 "
                    variant="bordered"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    color="secondary"
                    className="text-white font-bold bg-violet-800"
                    variant="solid"
                  >
                    Confirm
                  </Button>
                </div>
            </div>
        </div>
    )
}