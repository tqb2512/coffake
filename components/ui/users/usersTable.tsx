'use client'

import React from 'react';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Employee } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';


const columns = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Email", uid: "email" },
    { name: "Position", uid: "position" },
    { name: "Salary", uid: "salary", sortable: true },
    { name: "Actions", uid: "actions" }
];

export default function UsersTable() {

    const [employee, setEmployee] = React.useState<Employee[]>([]);

    React.useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setEmployee(data));
    }, []);

    const handleDelete = (id: string) => {
        fetch("/api/users", {
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
            aria-label='Users Table'
            className='border-b-1 border-b-gray-200' 
        >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn className='' key={column.uid}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {employee.map((employee) => (
                    <TableRow className='pt-4 border-b-2 border-gray-300' key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell className="relative">
                            <Dropdown className="border origin-top-right ">
                                <DropdownTrigger>
                                    <Button>
                                        <HiDotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Button>
                                            <Link href={`/users/${employee.username}`}>View</Link>
                                        </Button>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
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