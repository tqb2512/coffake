'use client'

import React, { useEffect, useState } from "react"
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Invoice } from "@prisma/client"

const collumns = [
    { name: "Name", key: "name" },
    { name: "Quantity", key: "quantity" },
    { name: "Unit Price", key: "unitPrice" },
    { name: "Supplier", key: "supplier" },
    { name: "Total", key: "total" }
]

export default function InvoiceInfoForm({ params }: { params: { invoiceId: string }}) {

    const [invoice, setInvoice] = useState<Invoice>()

    useEffect(() => {
        fetch(`/api/invoices/${params.invoiceId}`)
            .then((res) => res.json())
            .then((data) => setInvoice(data))
    }, [])

    if (!invoice) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>{invoice.date.toString()}</h1>
            <h1>{invoice.total}</h1>
            <Table>
                <TableHeader>
                    {collumns.map((collumn) => (
                        <TableColumn key={collumn.key}>{collumn.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {invoice.importList.map((item) => (
                        <TableRow key={item.ingredientId + item.suppilerId}>
                            <TableCell>{item.ingredientName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unitPrice}</TableCell>
                            <TableCell>{item.supplierName}</TableCell>
                            <TableCell>{item.quantity * item.unitPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}