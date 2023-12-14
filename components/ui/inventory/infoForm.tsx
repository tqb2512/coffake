'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Inventory, Invoice } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';

const columns = [
    { name: "Date", uid: "date", sortable: true },
    { name: "Supplier", uid: "supplier" },
    { name: "Quantity", uid: "quantity" },
    { name: "Unit Price", uid: "unitprice" },
    { name: "Total", uid: "total" },
    { name: "Actions", uid: "actions" }
];

export default function IngredientInfoForm({ params }: { params: { ingredientId: string } }) {

    const [inventory, setInventory] = React.useState<Inventory>();
    const [invoices, setInvoices] = React.useState<Invoice[]>([]);

    useEffect(() => {
        fetch("/api/inventory/" + params.ingredientId)
            .then((res) => res.json())
            .then((data) => setInventory(data));
    }, []);

    useEffect(() => {
        fetch("/api/inventory/" + params.ingredientId + "/getInvoices")
            .then((res) => res.json())
            .then((data) => setInvoices(data));
    }, []);

    return (
        <div>
            <h1>{inventory?.name}</h1>
            <Table
                aria-label='Inventory Table'
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.date.toString()}</TableCell>
                            <TableCell>
                                {invoice.importList.filter((item) => item.ingredientId == params.ingredientId)[0].supplierName}
                            </TableCell>
                            <TableCell>
                                {invoice.importList.filter((item) => item.ingredientId == params.ingredientId).reduce((a, b) => a + b.quantity, 0)}
                            </TableCell>
                            <TableCell>
                                {invoice.importList.filter((item) => item.ingredientId == params.ingredientId)[0].unitPrice}
                            </TableCell>
                            <TableCell>
                                {invoice.importList.filter((item) => item.ingredientId == params.ingredientId).reduce((a, b) => a + b.quantity * b.unitPrice, 0)}
                            </TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            <HiDotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link href={`/invoices/${invoice.id}`}>
                                                Edit
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