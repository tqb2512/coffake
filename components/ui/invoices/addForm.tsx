'use client'

import React from "react"
import { Supplier, Inventory, Invoice }from "@prisma/client"
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import InvoiceImportModal from "./importModal";

const collumns = [
    { name: "Name", key: "name" },
    { name: "Quantity", key: "quantity" },
    { name: "Unit Price", key: "unitPrice" },
    { name: "Supplier", key: "supplier" },
    { name: "Total", key: "total" }
]

export default function InvoiceAddForm() {

    const [invoice, setInvoice] = React.useState<Invoice>({
        date: new Date(),
    } as Invoice)

    const handleSubmmit = () => {
        setInvoice({
            ...invoice,
            total: invoice.importList?.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
        })
        fetch("/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(invoice)
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    return (
        <div>
            <InvoiceImportModal invoice={invoice} setInvoice={setInvoice}/>
            <Table>
                <TableHeader>
                    {collumns.map((collumn) => (
                        <TableColumn key={collumn.key}>{collumn.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {invoice.importList?.map((item) => (
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
            <Button onClick={handleSubmmit}>Submit</Button>
        </div>   
    )
}