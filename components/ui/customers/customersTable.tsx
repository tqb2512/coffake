'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Customer } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Email", uid: "email" },
    { name: "Phone", uid: "phone" },
    { name: "Actions", uid: "actions" }
];

export default function CustomersTable() {

    
    const [customers, setCustomers] = React.useState<Customer[]>([]);

    useEffect(() => {
        fetch("/api/customers")
            .then((res) => res.json())
            .then((data) => setCustomers(data));
    }, []);

    return (
        <Table
            aria-label='Customers Table'
        >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.uid}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>
                                        <HiDotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link href={`/customers/${customer.id}`}>
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
    );
}