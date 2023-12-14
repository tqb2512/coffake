'use client'

import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Inventory } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';

const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Stock", uid: "stock" },
    { name: "Unit", uid: "unit"},
    { name: "Unit Price", uid: "unitprice" },
    { name: "Actions", uid: "actions" }
];

export default function InventoryTable() {

    
    const [inventory, setInventory] = React.useState<Inventory[]>([]);

    useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => setInventory(data));
    }, []);

    return (
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
                {inventory.map((inventory) => (
                    <TableRow key={inventory.id}>
                        <TableCell>{inventory.name}</TableCell>
                        <TableCell>{inventory.stock}</TableCell>
                        <TableCell>{inventory.unit}</TableCell>
                        <TableCell>{inventory.unitPrice}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>
                                        <HiDotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link href={`/inventory/${inventory.id}`}>
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
    )
}