'use client'

import React from 'react';
import { Supplier } from '@prisma/client';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name : "Email", uid: "email", },
    { name : "Phone", uid: "phone", },
    { name: "Actions", uid: "actions" }
];

export default function SuppliersTable() {

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    
    React.useEffect(() => {
        fetch("/api/suppliers")
            .then((res) => res.json())
            .then((data) => setSuppliers(data));
    }, []);

    const handleDelete = (id: string) => {
        fetch("/api/suppliers", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }

    return (
        <Table
            aria-label='Supplier Table'
        >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.uid}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>
                                        <HiDotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label='Actions'>
                                    <DropdownItem
                                        aria-label='View'>
                                        <Link href={`/suppliers/${supplier.id}`}>View</Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        aria-label='Delete'
                                        onClick={() => handleDelete(supplier.id)}>
                                        Delete
                                    </DropdownItem>                                    
                                </DropdownMenu>
                            </Dropdown>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}