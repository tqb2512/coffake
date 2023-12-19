'use client'

import React from 'react'
import { Shift, Employee } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Divider, Input } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';
import { DatePicker } from '@tremor/react';
import AddEmployeeModal from './addEmployeeModal';

const columns = [
    { name: "Name", key: "name" },
    { name: "From", key: "from" },
    { name: "To", key: "to" },
    { name: "Actions", key: "actions" }
]

export default function AddShiftForm() {

    const [shift, setShift] = React.useState<Shift>({ date: new Date() } as Shift);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [employees, setEmployees] = React.useState<Employee[]>([]);

    React.useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    const addShift = () => {
        fetch(`/api/shifts`, {
            method: 'POST',
            body: JSON.stringify(shift),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const handleSubmit = () => {
        addShift();
    }

    return (
        <div>
            <label className="text-violet-800 text-3xl">
                {"Add Shift"}
                <DatePicker className="float-right max-w-sm mx-auto" value={shift.date} onValueChange={(value) => { setShift(prevShift => ({ ...prevShift, date: value || new Date() })) }} />
            </label>
            <Divider className="my-4" />

            <Button className="text-white bg-violet-800 my-5 float-right" onPress={() => setIsOpen(true)}>Add Employee</Button>
            <AddEmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} shift={shift} setShift={setShift} />

            <Table aria-label="Shifts">
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>{column.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {shift.employees?.map((employee) => (
                        <TableRow key={employee.employeeID}>
                            <TableCell>{employee.employeeName}</TableCell>
                            <TableCell>{employee.from}</TableCell>
                            <TableCell>{employee.to}</TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            <HiDotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <div className="flex justify-end gap-3">
                <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
            </div>
        </div>
    )
}
